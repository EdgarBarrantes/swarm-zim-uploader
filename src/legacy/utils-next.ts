import { Bee, Tag, Utils } from "@ethersphere/bee-js";

import { MantarayNode } from "mantaray-js";
import { loadAllNodes } from "mantaray-js";
import type { Reference, StorageLoader, StorageSaver } from "mantaray-js";
import { initManifestNode, NodeType } from "mantaray-js";

import * as FS from "fs/promises";
import PATH from "path";
import { resolve, relative } from "path";
import { readdir } from "fs/promises";
import { Dirent } from "fs";

import http from "node:http";
import https from "node:https";

const httpAgent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 1000,
});
const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 10000,
  maxSockets: 1000,
});

const axios = require("axios");
axios.default;
axios.defaults.httpAgent = httpAgent;
axios.defaults.httpsAgent = httpsAgent;
axios.defaults.timeout = 10000; // Default of 10 second timeout

let beeUrl = "http://bee-1:1633";
let localBeeUrl = "http://localhost:1633";
const setBeeUrl = (url: string) => {
  beeUrl = url;
};
let batchID = "";
const setBatchID = (id: string) => {
  batchID = id;
};

var bee: Bee;
try {
  bee = new Bee(beeUrl);
} catch (err) {
  showBoth(`${err}`);
}

let tagID = 0;
let progress = "";
const uploadDelay = 0; // msec to sleep after each upload to give node a chance to breathe (0 to disable)

var exitRequested = false;

// # Log related

function specificLocalTime(when: Date) {
  return when.toLocaleTimeString("en-GB"); // en-GB gets a 24hour format, but amazingly local time!
}

function currentLocalTime() {
  return specificLocalTime(new Date());
}

function showTopLine(text: string) {
  text = currentLocalTime() + " " + text;
  // Save cursor, Home cursor, text, Erase to end of line, Restore cursor
  process.stderr.write("\u001b7" + "\u001b[H" + text + "\u001b[K" + "\u001b8");
}

function showSecondLine(text: string) {
  const save = "\u001b7";
  const home = "\u001b[H";
  const down = "\u001bD";
  const erase = "\u001b[K";
  const restore = "\u001b8";
  text = currentLocalTime() + " " + text;
  // Save cursor, Home cursor, Down line, text, Erase to end of line, Restore cursor
  //process.stderr.write('\u001b7'+'\u001b[H'+'\u001bD'+text+'\u001b[K'+'\u001b[H'+'\u001bD'+'\u001bD'+'\u001b[K'+'\u001b8')
  process.stderr.write(
    save + home + down + text + erase + home + down + down + erase + restore
  );
}

function showError(text: string) {
  //process.stderr.clearLine(1);
  console.error("\u001b[K" + currentLocalTime() + " " + text);
}

function showLog(text: string) {
  printStatus(text);
  console.log(currentLocalTime() + " " + text);
}

function showBoth(text: string) {
  showLog(text);
  showError(text);
}

var pendingStatus: string | undefined = undefined;

async function statusPrinter() {
  await sleep(500);
  process.stderr.write(pendingStatus + "\u001b[K\r"); // Erase to end of line then return
  //	process.stderr.clearLine(1); process.stderr.cursorTo(0);
  pendingStatus = undefined;
}

function printStatus(text: string) {
  if (!pendingStatus) statusPrinter();
  pendingStatus = text;
}

const hexToBytes = (hexString: string): Reference => {
  return Utils.hexToBytes(hexString);
};

const bytesToHex = (data: Uint8Array | undefined): string => {
  if (!data) return "*undefined*";
  return Utils.bytesToHex(data);
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function statusDelay(sec: number) {
  while (sec > 0) {
    printStatus(`Delaying ${sec} seconds...`);
    await sleep(1000);
    sec--;
  }
}

var mime = require("mime-types");

function contentType(path: string): string {
  var mimeType = mime.lookup(path);
  if (!mimeType) {
    mimeType = mime.lookup(".bin");
    if (!mimeType) mimeType = "application/octet-stream";
  }
  return mime.contentType(mimeType);
}

var utf8ArrayToStr = (function () {
  var charCache = new Array(128); // Preallocate the cache for the common single byte chars
  var charFromCodePt = String.fromCodePoint || String.fromCharCode;
  var result = Array<string>();
  const hasFromCodePoint = typeof String.fromCodePoint == "function";

  return function (array: Uint8Array) {
    var codePt, byte1;
    var buffLen = array.length;

    result.length = 0;

    for (var i = 0; i < buffLen; ) {
      byte1 = array[i++];

      if (byte1 <= 0x7f) {
        codePt = byte1;
      } else if (byte1 <= 0xdf) {
        codePt = ((byte1 & 0x1f) << 6) | (array[i++] & 0x3f);
      } else if (byte1 <= 0xef) {
        codePt =
          ((byte1 & 0x0f) << 12) |
          ((array[i++] & 0x3f) << 6) |
          (array[i++] & 0x3f);
      } else if (hasFromCodePoint) {
        codePt =
          ((byte1 & 0x07) << 18) |
          ((array[i++] & 0x3f) << 12) |
          ((array[i++] & 0x3f) << 6) |
          (array[i++] & 0x3f);
      } else {
        codePt = 63; // Cannot convert four byte code points, so use "?" instead
        i += 3;
      }

      result.push(
        charCache[codePt] || (charCache[codePt] = charFromCodePt(codePt))
      );
    }

    return result.join("");
  };
})();

// type gotFile = {
//   fullPath: string;
//   entry: Dirent;
// };

// async function* getFileEntries(dir: string): AsyncGenerator<gotFile> {
//   const entries = await readdir(dir, { withFileTypes: true });
//   for (const entry of entries) {
//     const res = resolve(dir, entry.name);
//     yield { fullPath: res, entry: entry };
//   }
// }

async function* getFiles(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const res = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function executeBinaryAPI(
  URL: string,
  API: string,
  params: string = "",
  method: string = "get",
  headers: any = {},
  body: any = ""
) {
  if (params != "") params = "/" + params;

  var actualURL = URL + "/" + API + params;
  var doing = method + " " + actualURL;

  var start = new Date().getTime();

  try {
    //showError('Starting '+doing)
    //var response = await axios({ method: method, url: actualURL, headers: headers, data: body })
    var response = await axios({
      method: method,
      url: actualURL,
      headers: headers,
      data: body,
      responseType: "arraybuffer",
      httpAgent: httpAgent,
      httpsAgent: httpsAgent,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  } catch (err: any) {
    var elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
    if (err.response) {
      //showError(actualURL)
      showError(
        doing +
          " " +
          elapsed +
          "s response error " +
          err +
          " with " +
          JSON.stringify(err.response.data)
      );
      //showError(JSON.stringify(err.response.data))
    } else if (err.request) {
      showError(doing + " " + elapsed + "s request error " + err);
      //showError(JSON.stringify(err.request))
    } else {
      showError(doing + " " + elapsed + "s other error " + err);
      //showError(JSON.stringify(err))
    }
    throw err;
    return void 0;
  }
  var elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
  //showError(actualURL+' response.data='+JSON.stringify(response.data))
  //showError(doing+' '+elapsed+' response.data='+JSON.stringify(response.data))

  return response.data;
}

async function executeAPI(
  URL: string,
  API: string,
  params: string = "",
  method: string = "get",
  headers: any = {},
  body: any = ""
) {
  if (params != "") params = "/" + params;

  var actualURL = URL + "/" + API + params;
  var doing = method + " " + actualURL;

  var start = new Date().getTime();

  try {
    //showError('Starting '+doing)
    //var response = await axios({ method: method, url: actualURL, headers: headers, data: body })
    var response = await axios({
      method: method,
      url: actualURL,
      headers: headers,
      data: body,
      httpAgent: httpAgent,
      httpsAgent: httpsAgent,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  } catch (err: any) {
    var elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
    if (err.response) {
      //showError(actualURL)
      showError(
        doing +
          " " +
          elapsed +
          "s response error " +
          err +
          " with " +
          JSON.stringify(err.response.data)
      );
      //showError(JSON.stringify(err.response.data))
    } else if (err.request) {
      showError(doing + " " + elapsed + "s request error " + err);
      //showError(JSON.stringify(err.request))
    } else {
      showError(doing + " " + elapsed + "s other error " + err);
      //showError(JSON.stringify(err))
    }
    throw err;
    return void 0;
  }
  var elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
  //showError(actualURL+' response.data='+JSON.stringify(response.data))
  //showError(doing+' '+elapsed+' response.data='+JSON.stringify(response.data))

  return response.data;
}

var runMonitor = true;
async function monitorTag(ID: number): Promise<boolean> {
  showLog(`Monitoring tag ${ID}`);
  var lastTag;
  var lastText;
  var nextTime;
  while (runMonitor) {
    if (tagID != ID) {
      showBoth(`Monitoring tag ${ID} exiting, tagID=${tagID}`);
      break;
    }
    try {
      //const tag = await bee.retrieveTag(ID)
      const tag = await executeAPI(beeUrl, "tags", `${ID}`);

      const text = `TAG ${ID} sync:${tag.synced} proc:${tag.processed} total:${
        tag.total
      } procPend:${tag.total - tag.processed} syncPend:${
        tag.processed - tag.synced
      }`;
      if (!lastTag || !lastText || lastText != text) {
        showTopLine(text);
        lastText = text;
        lastTag = tag;
      }
      if (!nextTime || new Date() >= nextTime) {
        showLog(`${progress} ${text}`);
        nextTime = new Date(new Date().getTime() + 1 * 60000);
      }
      await sleep(1000);
      showSecondLine(progress);
    } catch (err) {
      showError(`monitorTag: ${err}`);
      await sleep(10000);
    }
  }
  if (lastText) showBoth(`Done Monitoring ${ID} ${lastText}`);
  return true;
}

function logDeltaTag(what: string, startTag: Tag, endTag: Tag) {
  var text = `${what} total:${endTag.total - startTag.total} proc:${
    endTag.processed - startTag.processed
  } sync:${endTag.synced - startTag.synced}`;
  showLog(text);
  showError(text);
}

async function countManifest(
  node: MantarayNode,
  prefix: string = "",
  indent: string = ""
): Promise<number> {
  var count = 0;
  if (node.forks) {
    for (const [key, fork] of Object.entries(node.forks)) {
      var newPrefix = prefix + utf8ArrayToStr(fork.prefix);
      count += await countManifest(fork.node, newPrefix, indent + "  ");
    }
  }

  count++;
  if (node.isWithPathSeparatorType()) {
    const heap = process.memoryUsage();
    progress = `Count ${prefix} rss:${Math.floor(
      heap.rss / 1024 / 1024
    )}MB heap:${Math.floor(heap.heapUsed / 1024 / 1024)}/${Math.floor(
      heap.heapTotal / 1024 / 1024
    )}MB`;
    showSecondLine(progress);
    //printStatus(`${indent} ${prefix} => ${count} Node`)
  }
  return count;
}

type SaveManifestReturn = {
  reference: Reference;
  count: number;
};

type SaveManifestCounts = {
  processed: number;
  total: number;
};

async function saveManifest(
  storageSaver: StorageSaver,
  node: MantarayNode,
  prefix: string = "",
  indent: string = "",
  counts: SaveManifestCounts | undefined = undefined
): Promise<SaveManifestReturn> {
  if (!counts) {
    counts = { processed: 0, total: await countManifest(node) };
    showBoth(`Saving ${counts.total} manifest nodes`);
  }

  var myCount = 0;
  if (node.forks) {
    for (const [key, fork] of Object.entries(node.forks)) {
      const newPrefix = prefix + utf8ArrayToStr(fork.prefix);
      const { reference, count } = await saveManifest(
        storageSaver,
        fork.node,
        newPrefix,
        indent + "  ",
        counts
      );
      //showLog(`save ${newPrefix} => ${bytesToHex(reference)}`)
      myCount += count;
    }
  }

  var ref = hexToBytes(zeroAddress);
  try {
    ref = await node.save(storageSaver);
    showLog(`save ${prefix} => ${bytesToHex(ref)}`);
  } catch (err) {
    showBoth(`save ${prefix} ERROR ${err}`);
  }
  if (counts) counts.processed++;
  myCount++;

  const heap = process.memoryUsage();
  progress = `rss:${Math.floor(heap.rss / 1024 / 1024)}MB heap:${Math.floor(
    heap.heapUsed / 1024 / 1024
  )}/${Math.floor(heap.heapTotal / 1024 / 1024)}MB`;
  if (counts && counts.total > 0 && counts.processed > 0) {
    const didPercent =
      Math.floor((counts.processed / counts.total) * 10000) / 100;
    progress = `Save ${prefix} ${didPercent}% or ${counts.processed}/${counts.total} ${progress}`;
  }

  if (node.isWithPathSeparatorType()) {
    showSecondLine(progress);
    printStatus(`${indent} ${prefix} => ${bytesToHex(ref)} Node`);
  }

  return { reference: ref, count: myCount };
}

// TODO CHECK THIS
async function storeFileAsPath(
  fullPath: string,
  posixPath: string,
  rootNode: MantarayNode | undefined,
  coverageCallback?: (z: number, x: number, y: number) => void
) {
  var mimeType = contentType(fullPath);
  const content = await FS.readFile(fullPath);
  const stats = await FS.stat(fullPath);
  const modified = stats.mtime;
  let lastModified = modified.toUTCString();
  let metaData = {
    "Content-Type": mimeType,
    Filename: PATH.basename(fullPath),
  };
  //Object.assign(metaData, { "Last-Modified": lastModified })

  if (coverageCallback) {
    if (posixPath.slice(-4).toLowerCase() == ".png") {
      showError(`Need To Parse ${posixPath} for coverageCallback`);
    }
  }

  printStatus(
    `adding ${fullPath} as ${posixPath} type:${mimeType} modified:${lastModified}`
  );
  const reference = await uploadData(content, posixPath, true);

  const entry = bytesToHex(reference);
  if (rootNode) {
    //showBoth(`adding rootNode Fork for ${fullPath}->${posixPath} reference ${bytesToHex(reference)}`)
    rootNode.addFork(new TextEncoder().encode(posixPath), reference, metaData);
  }
  //else showBoth(`NOT adding Fork for ${fullPath}->${posixPath} reference ${bytesToHex(reference)}`)
}

// async function storeFile(
//   fullPath: string,
//   rootNode: MantarayNode | undefined,
//   rootPath: string,
//   coverageCallback?: (z: number, x: number, y: number) => void
// ) {
//   const relPath = relative(rootPath, fullPath);
//   const posixPath = relPath.split(PATH.sep).join(PATH.posix.sep);

//   const stats = await FS.stat(fullPath);
//   const modified = stats.mtime;

//   return storeFileAsPath(fullPath, posixPath, rootNode, coverageCallback);
// }

async function addFile(
  node: MantarayNode,
  sourcePath: string,
  filePath: string
) {
  const stats = await FS.stat(filePath);
  const modified = stats.mtime;
  const modifiedUTC = modified.toUTCString();

  const relPath = relative(sourcePath, filePath);
  const posixPath = relPath.split(PATH.sep).join(PATH.posix.sep);
  var mimeType = contentType(relPath);

  // CHECK THIS
  // if (mimeType == "application/octet-stream") {
  //   if (posixPath.slice(0, 2) == "A/") mimeType = "text/html";
  //   else if (posixPath.slice(0, 2) == "M/") mimeType = "text/plain";
  // }
  if (mimeType == "application/octet-stream") {
    const fileString = filePath.split(".");
    if (fileString[fileString.length - 1] === "html") mimeType = "text/html";
    else if (fileString[fileString.length - 1] === "css")
      mimeType = "text/plain";
  }

  const content = await FS.readFile(filePath);
  let metaData = { "Content-Type": mimeType, Filename: PATH.basename(relPath) };
  //Object.assign(metaData, { "Last-Modified": modifiedUTC })
  //showLog(`adding ${posixPath} type:${mimeType} modified:${modifiedUTC}`);

  const reference = await uploadData(content, relPath, true);
  node.addFork(new TextEncoder().encode(posixPath), reference, metaData);
  //
  // The following bit of code puts exceptions back on the path where they originally were.
  // zimdump does this if a given path is both a directory AND an explicit file
  // if (posixPath.slice(0, 12) == "_exceptions/") {
  //   var newPath = posixPath.slice(12).replace(/%2f/g, "/");
  //   var mimeType2 = contentType(newPath);
  //   if (mimeType2 == "application/octet-stream") {
  //     if (newPath.slice(0, 2) == "A/") mimeType2 = "text/html";
  //     else if (newPath.slice(0, 2) == "M/") mimeType2 = "text/plain";
  //   }
  //   let metaData2 = {
  //     "Content-Type": mimeType2,
  //     Filename: PATH.basename(newPath),
  //   };
  //   showLog(
  //     `Adding ${relPath} also as ${newPath} ${JSON.stringify(metaData2)}`
  //   );
  //   //Object.assign(metaData2, { "Last-Modified": modifiedUTC })
  //   node.addFork(new TextEncoder().encode(newPath), reference, metaData2); // Insert another node for where the exception SHOULD have been
  // }
}

async function newManifest(
  storageSaver: StorageSaver,
  sourcePath: string
): Promise<string> {
  const startTag = await bee.createTag();
  tagID = startTag.uid;

  runMonitor = true;
  const monTag = monitorTag(tagID);

  showBoth(
    `Creating manifest from ${sourcePath} using tag ${tagID} at ${startTag.startedAt}`
  );

  //const node = initManifestNode()	// Only if you want a random obfuscation key
  const node = new MantarayNode();

  showBoth(`Counting files and generating index`);
  var fileCount = 0;
  await (async () => {
    for await (const f of getFiles(sourcePath)) {
      const relPath = relative(sourcePath, f);

      fileCount++;
      const heap = process.memoryUsage();
      progress = `rss:${Math.floor(heap.rss / 1024 / 1024)}MB heap:${Math.floor(
        heap.heapUsed / 1024 / 1024
      )}/${Math.floor(heap.heapTotal / 1024 / 1024)}MB`;
      progress = `Count ${fileCount} ${sourcePath} ${progress}`;
    }
  })();

  // if (indexHTML != "") {
  //   const header =
  //     "<HEAD><style>li {display: block; width: 33%; float: left; line-height: 1.25em;}</style></HEAD>";
  //   if (hasIndex) {
  //     indexHTML = `<HTML>${header}<BODY><center><H2>For the default ${index}, click <A HREF="${index}">HERE</A></H2><P><UL>${indexHTML}</UL></center></BODY></HTML>`;
  //   } else {
  //     indexHTML = `<HTML>${header}<BODY><center><UL>${indexHTML}</UL></center></BODY></HTML>`;
  //   }
  //   const redirect = `master-index.html`;
  //   const indexRef = await uploadData(indexHTML, redirect, true);
  //   node.addFork(new TextEncoder().encode(redirect), indexRef);
  //   index = redirect;
  // } else if (hasIndex) {
  //   if (index != "index.html") {
  //     // Probably only need to do this if there's a separator in index...
  //     const redirect = `index-redirect.html`;
  //     const indexRef = await uploadData(
  //       `<script>location.replace('${index}')</script>`,
  //       redirect,
  //       true
  //     );
  //     node.addFork(new TextEncoder().encode(redirect), indexRef);
  //     index = redirect;
  //   }
  // }

  // if (index) {
  const rootMeta = { "website-index-document": "index.html" };
  node.addFork(
    new TextEncoder().encode("/"),
    hexToBytes(zeroAddress),
    rootMeta
  );

  const rootFork = node.getForkAtPath(new TextEncoder().encode("/"));
  const rootNode = rootFork.node;
  let type = rootNode.getType;
  type |= NodeType.value;
  type = (NodeType.mask ^ NodeType.withPathSeparator) & type;
  rootNode.setType = type;
  // }

  showBoth(`Adding ${fileCount} files`);
  var didCount = 0;
  await (async () => {
    for await (const f of getFiles(sourcePath)) {
      const relPath = relative(sourcePath, f);
      const posixPath = relPath.split(PATH.sep).join(PATH.posix.sep);

      didCount++;
      printStatus(`queueing ${didCount}/${fileCount} ${posixPath}`);

      const heap = process.memoryUsage();
      progress = `rss:${Math.floor(heap.rss / 1024 / 1024)}MB heap:${Math.floor(
        heap.heapUsed / 1024 / 1024
      )}/${Math.floor(heap.heapTotal / 1024 / 1024)}MB`;
      if (fileCount > 0) {
        const didPercent = Math.floor((didCount / fileCount) * 10000) / 100;
        progress = `Add ${posixPath} ${didPercent}% or ${didCount}/${fileCount} ${progress}`;
      }

      await addFile(node, sourcePath, f);
    }
  })();

  await sleep(1000);

  const middleTag = await bee.retrieveTag(tagID);

  showBoth(`Saving manifest`);

  var start = new Date().getTime();
  var refCollection = (await saveManifest(storageSaver, node)).reference;
  var elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);

  showBoth(
    `Final ${sourcePath} collection reference ${bytesToHex(
      refCollection
    )} in ${elapsed}s`
  );

  const endTag = await bee.retrieveTag(tagID);

  logDeltaTag("manifest create", startTag, middleTag);
  logDeltaTag("manifest save", middleTag, endTag);
  logDeltaTag("manifest total", startTag, endTag);

  runMonitor = false;
  await monTag;

  return bytesToHex(refCollection);
}

const zeroAddress =
  "0000000000000000000000000000000000000000000000000000000000000000";

async function printAllForks(
  storageLoader: StorageLoader,
  node: MantarayNode,
  reference: Reference | undefined,
  prefix: string,
  indent: string,
  what: string,
  filter: string | undefined,
  excludes: string[] | undefined,
  manifestOnly: Boolean,
  loadFiles: Boolean,
  saveFiles: Boolean
): Promise<void> {
  if (!reference) return;

  if (exitRequested) return;

  try {
    await node.load(storageLoader, reference);
  } catch (err) {
    var badAddr = bytesToHex(reference);
    showBoth(
      `printAllForks: Failed to load ${prefix} address ${badAddr} ${err}`
    );
    return;
  }

  var types = "";
  if (node.isValueType()) types = types + "Value ";
  if (node.isEdgeType()) types = types + "Edge ";
  if (node.isWithPathSeparatorType()) types = types + "Separator ";
  if (node.IsWithMetadataType()) types = types + "Meta ";

  var address = node.getContentAddress;
  var addrString = "";
  if (address) addrString = bytesToHex(address);
  //showLog(`${indent}type:x${Number(node.getType).toString(16)} ${types} prefix:${prefix} content:${addrString}`)

  showLog(
    `${indent}type:x${Number(node.getType).toString(
      16
    )} ${types} prefix:${prefix} content:${addrString}`
  );

  //var reference = bytesToHex(node.getReference)
  //if (reference != zeroAddress)
  //	console.log(`${indent}reference:${reference}`)
  // var obfuscation = bytesToHex(node.getObfuscationKey);
  //if (obfuscation != zeroAddress)
  //	showLog(`${indent}obfuscation:${obfuscation}`)

  var entry = bytesToHex(node.getEntry);
  if (entry != zeroAddress) {
    showLog(
      `${indent}type:x${Number(node.getType).toString(
        16
      )} ${types} prefix:${prefix} entry:${entry}`
    );
    if (loadFiles && what && what != "") {
      try {
        const content = await downloadData(entry, prefix);
        showLog(`${indent}${prefix} got ${content.length} bytes`);
      } catch (err) {
        showLog(`printAllForks:downloadData(${prefix}) err ${err}`);
      }
    }
  }

  if (node.IsWithMetadataType() && node.getMetadata) {
    var meta = "";
    for (const [key, value] of Object.entries(node.getMetadata)) {
      meta = meta + key + ":" + value + " ";
    }
    showLog(`${indent}metadata: ${meta}`);
  }

  if (exitRequested) return;

  if (!node.forks) return;
  for (const [key, fork] of Object.entries(node.forks)) {
    var newPrefix = prefix + utf8ArrayToStr(fork.prefix);
    if (filter && filter != "") {
      const checkLen = Math.min(newPrefix.length, filter.length);
      if (newPrefix.slice(0, checkLen) == filter.slice(0, checkLen)) {
        if (checkLen < filter.length) {
          showLog(`printAllForks:recursing ${newPrefix} for ${filter}`);
          await printAllForks(
            storageLoader,
            fork.node,
            fork.node.getEntry,
            newPrefix,
            indent + "  ",
            what,
            filter,
            excludes,
            manifestOnly,
            loadFiles,
            saveFiles
          );
          continue;
        } else
          showBoth(
            `printAllForks:Satisfied ${filter} with ${newPrefix} ${bytesToHex(
              fork.node.getEntry
            )}`
          );
      } else {
        showLog(`printAllForks:Ignoring ${newPrefix} NOT ${filter}`);
        continue;
      }
    }
    if (excludes && excludes.length > 0) {
      let found = false;
      for (const exclude of excludes) {
        if (newPrefix.length >= exclude.length) {
          if (newPrefix.slice(0, exclude.length) == exclude) {
            showBoth(`printAllForks:Excluding ${newPrefix}`);
            found = true;
            break;
          }
        }
      }
      if (found) continue;
    }
    await printAllForks(
      storageLoader,
      fork.node,
      fork.node.getEntry,
      newPrefix,
      indent + "  ",
      what,
      filter,
      excludes,
      manifestOnly,
      loadFiles,
      saveFiles
    );
  }
}

// async function dumpManifest(
//   storageLoader: StorageLoader,
//   reference: string,
//   what: string,
//   filter: string | undefined = undefined,
//   excludes: string[] | undefined,
//   manifestOnly = false,
//   loadFiles: Boolean = true,
//   saveFiles: Boolean = false
// ): Promise<MantarayNode> {
//   var start = new Date().getTime();
//   showLog(`dumpManifest:${what} from ${reference} ${filter}`);

//   const node = new MantarayNode();
//   await printAllForks(
//     storageLoader,
//     node,
//     hexToBytes(reference),
//     "",
//     "",
//     what,
//     filter,
//     excludes,
//     manifestOnly,
//     loadFiles,
//     saveFiles
//   );

//   var elapsed = Math.trunc((new Date().getTime() - start) / 1000 + 0.5);
//   showBoth(`dumpManifest:${what} ${filter} in ${elapsed} seconds`);

//   return node;
// }

async function uploadData(
  content: Uint8Array | string,
  what: string,
  pin: boolean
): Promise<Reference> {
  const retryDelay = 15; // 15 second delay before doing a retry
  const timeout = 10000; // 10 second timeout per request, note this is *4 for retries
  var reference: string;
  var start = new Date().getTime();
  try {
    //reference = (await bee.uploadData(batchID, content, {pin: pin, tag: tagID, timeout: timeout, fetch: fetch})).reference
    reference = (
      await executeAPI(
        beeUrl,
        "bytes",
        "",
        "POST",
        {
          "Content-Type": "application/octet-stream",
          "swarm-postage-batch-id": batchID,
          "swarm-tag": `${tagID}`,
          "swarm-pin": `${pin}`,
        },
        content
      )
    ).reference;
    if (uploadDelay > 0) await sleep(uploadDelay);
  } catch (err) {
    showBoth(`uploadData ${what} ${content.length} bytes failed with ${err}`);
    await statusDelay(retryDelay);
    printStatus(
      `uploadData RETRYING ${what} ${content.length} bytes after ${err}`
    );
    try {
      //reference = (await bee.uploadData(batchID, content, {pin: pin, tag: tagID, timeout: timeout*4, fetch: fetch})).reference	// Quadruple the timeout for the retry
      reference = (
        await executeAPI(
          beeUrl,
          "bytes",
          "",
          "POST",
          {
            "Content-Type": "application/octet-stream",
            "swarm-postage-batch-id": batchID,
            "swarm-tag": `${tagID}`,
            "swarm-pin": `${pin}`,
          },
          content
        )
      ).reference;
    } catch (err) {
      showBoth(
        `uploadData ${what} RETRY ${content.length} bytes failed with ${err}`
      );
      throw err;
    }
  }
  var elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
  if (elapsed >= timeout / 4 / 1000)
    // Alert the user if we are >25% of timeout value
    showError(
      `uploadData ${what} ${content.length} bytes took ${elapsed}s, ref:${reference}`
    );
  showLog(`Upload ${what} ${content.length} bytes => ${reference}`);
  return hexToBytes(reference);
}

const saveFunction = async (data: Uint8Array): Promise<Reference> => {
  return uploadData(data, `saveFunction(${data.length})`, true);
  //	try {
  //		const hexRef = await bee.uploadData(batchID, data, {pin: true, tag: tagID})
  //		if (uploadDelay > 0) await sleep(uploadDelay)
  //		return hexToBytes(hexRef)
  //	}
  //	catch (err) {
  //		showBoth(`saveFunction ${data.length} bytes failed with ${err}`)
  //		await statusDelay(15)
  //		try {
  //			const hexRef = await bee.uploadData(batchID, data, {pin: true, tag: tagID})
  //			return hexToBytes(hexRef)
  //		}
  //		catch (err) {
  //			showBoth(`saveFunction RETRY ${data.length} bytes failed with ${err}`)
  //			throw err
  //		}
  //	}
};

async function downloadData(
  address: string,
  what: string = "*unknown*"
): Promise<Uint8Array> {
  var start = new Date().getTime();
  var bytes = 0;
  var content;
  try {
    //content = await bee.downloadData(address)
    content = await executeBinaryAPI(beeUrl, "bytes", address);
    bytes = content.length;
    if (bytes == 0) throw new Error("Zero Bytes Read");
    //var content = await executeAPI(beeUrl, 'bytes', 'get', address)
  } catch (err) {
    const elapsed =
      Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
    showBoth(
      `downloadData ${what} ${address} failed in ${elapsed}s with ${err}`
    );
    throw err;
  }
  const elapsed = Math.trunc((new Date().getTime() - start) / 100 + 0.5) / 10.0;
  if (elapsed >= 5)
    showError(
      `downloadData(${what} ${address}) took ${elapsed}s for ${bytes} bytes`
    );
  return content;
}

// const loadFunction = async (address: Reference): Promise<Uint8Array> => {
//   return downloadData(bytesToHex(address), "loadFunction");
//	var start = new Date().getTime()
//	var bytes = 0
//	var r
//	try {
//		r = await bee.downloadData(bytesToHex(address))
//		bytes = r.length
//		if (bytes == 0) throw new Error('Zero Bytes Read');
//	}
//	catch (err) {
//		const elapsed = Math.trunc((new Date().getTime() - start)/100+0.5)/10.0
//		showBoth(`loadFunction ${bytesToHex(address)} failed in ${elapsed}s with ${err}`)
//		throw err
//	}
//	var elapsed = Math.trunc((new Date().getTime() - start)/100+0.5)/10.0
//	if (elapsed >= 1)
//		showError(`loadFunction(${bytesToHex(address)}) took ${elapsed}s`)
//	return r;
// };

async function doit(srcDir: string) {
  //	For uploading a straight directory set with an index.html
  //	const rootNode = await newManifest(saveFunction, srcDir, "index.html")
  //	showBoth(`Uploaded ${srcDir} as ${rootNode}`)

  //	For uploading a Wikipedia archive with A/index
  const rootNode = await newManifest(saveFunction, srcDir);
  showBoth(`Uploaded ${srcDir} as ${rootNode}`);

  //	You can define your own root reference for dumping purposes if desired
  //	const rootNode = "9aafea948007399891290fc3b294fdfbbf7f51313111dd20ba2bb6ff2a1ecd27"

  //	This will dump out the uploaded manifest for diagnostic purposes
  //	await dumpManifest(loadFunction, rootNode, srcDir, undefined, undefined, false, true, false)

  showBoth(
    `TAG information may be viewed using curl ${beeUrl}/tags/${tagID} | jq`
  );
  showBoth(`View your archive at ${beeUrl}/bzz/${rootNode}`);
}

// try {
//   doit(process.argv[2]);
// } catch (err) {
//   showBoth(`${err}`);
// }

export { doit, setBeeUrl, setBatchID };
