import express, { Application, Request, Response } from "express";
import fs from "fs";
import { exec } from "child_process";
import download from "download";
import { Bee, BeeDebug } from "@ethersphere/bee-js";
import { processAndUpload, setBatchID } from "./utils";

const app: Application = express();

const port = 8080;

const beeUrlLocal = "http://localhost:1633";
const beeUrl = "http://bee-1:1633";
const beeDebugUrl = "http://bee-1:1635";
const publicGateway = "https://gateway.ethswarm.org/bzz";

const bee = new Bee(beeUrl);
const debugBee = new BeeDebug(beeDebugUrl);

app.post("/upload", async (req: Request, res: Response) => {
  const { url, bid } = req.query;

  console.log("Query:", req.query);
  console.log("Url", url);
  console.log("Id", bid);

  if (url !== undefined && bid !== undefined) {
    try {
      await prepareFiles(<string>url);
      console.log("Files done!");
      console.log("Starting upload to swarm...");
      const { hash } = await uploadToSwarm(<string>bid);
      res.send({
        status: 200,
        data: `File is being uploaded, and the hash is: ${hash}`,
        hash,
        localUrl: `${beeUrlLocal}/bzz/${hash}`,
        gatewayUrl: `${publicGateway}/${hash}`,
      });
    } catch (error) {
      throw error;
    }
  } else {
    res.send("I need an url and batch id\n");
  }
});

app.get("/check-upload", async (req: Request, res: Response) => {
  const { tag } = req.query;
  console.log("Cheking the status of:", tag);
  if (tag !== undefined) {
    const tagStatus = await checkUploadStatus(<string>tag);
    const finished = tagStatus.total - tagStatus.synced === 0 ? true : false;
    console.log("Files synced:", finished);
    res.send({
      tag: tagStatus,
      finished,
    });
  } else {
    res.send("I need a tag number\n");
  }
});

app.get("/get-batch-id", async (req: Request, res: Response) => {
  const batchId = await debugBee.createPostageBatch("10000000", 24);
  res.send(<string>batchId);
});

app.get("/get-address-to-fund", async (req: Request, res: Response) => {
  const addresses = await debugBee.getNodeAddresses();
  res.send(addresses.ethereum);
});

const uploadToSwarm = async (batchId: string) => {
  try {
    console.log("Swarm node up:", await bee.isConnected());
    // const tag = await bee.createTag();
    // console.log("Tag created: ", tag.uid);
    // Add label.
    // const batchId = await debugBee.createPostageBatch("10000000", 24);
    // const batchId =
    //   "01077a80d594c2d694efae01f93f3294aeabaf7d48bfcfd7f5f319b46726223e";
    // console.log("Batch created, id:", batchId);
    // Will change as soon as I envision a way to get to know if a stamp has propagated.
    // Or I change the way the api works.
    // const secondsToWait = 30;
    // console.log(
    //   `Waiting ${secondsToWait} seconds hoping for the stamps to propagate...`
    // );
    // await new Promise((resolve) => setTimeout(resolve, secondsToWait * 1000));

    // Works for small folders, but with big ones sucks for now.
    // const { tagUid, reference: hash } = await bee.uploadFilesFromDirectory(
    //   batchId,
    //   "wiki-website.tar",
    //   { tag: tag.uid, errorDocument: "index.html", indexDocument: "index.html" }
    // );

    console.log("Starting the upload to swarm...");

    setBatchID(batchId);
    const { hash, tagId } = await processAndUpload("app-wiki/wiki-files");
    // doit("app-wiki/out");
    // const file = fs.createReadStream("wiki-website.tar");

    // const fetchResult = await fetch(`${beeUrl}/bzz`, {
    //   method: "post",
    //   headers: [
    //     ["Content-Type", "application/x-tar"],
    //     ["Swarm-Index-Document", "index.html"],
    //     ["Swarm-Error-Document", "index.html"],
    //     ["Swarm-Collection", "true"],
    //     ["Swarm-Postage-Batch-Id", <string>batchId],
    //   ],
    //   body: file,
    // });

    // console.log("Result", fetchResult);
    // // Fetch

    // const body = await fetchResult.json();
    // console.log("Body", body);

    // const hash = body.reference;
    // const tagUid = tag.uid;
    // const hash = "none";
    // const tagUid = 1;

    // const { tagUid, reference: hash } = await bee.uploadFilesFromDirectory(
    //   batchId,
    //   "wiki-website.tar",
    //   { tag: tag.uid, errorDocument: "index.html", indexDocument: "index.html" }
    // );
    // console.log("Files succesfully uploaded!");
    // console.log("Hash: ", hash);
    // writeHash(hash, tagUid);
    // return { tag: tagUid, hash };

    console.log("Files succesfully uploaded!");
    console.log("Hash: ", hash);
    console.log("TagId: ", tagId);
    writeHash(hash, tagId);
    return { hash };
  } catch (error) {
    throw error;
  }
};

const checkUploadStatus = (tag: string) => {
  return bee.retrieveTag(Number(tag));
};

const downloadFiles = async (wikiUrl: string) => {
  await Promise.all(
    [
      { url: wikiUrl, file: "wiki.zim" },
      // I had the idea of downloading especific zim-tools, but in reality this could be used safely for now.
      // And it makes the process way speedier.
      // {
      //   url: "https://download.openzim.org/release/zim-tools/zim-tools_linux-x86_64-3.1.0.tar.gz",
      //   file: "zimtools.tar.gz",
      // },
      // ].map(({ url, file }) => download(url, `./downloads`, { filename: file }))
    ].map(({ url, file }) => download(url, `./downloads`, { filename: file }))
  );
};

const prepareFiles = async (url: string) => {
  console.log("Downloading wiki extract...");
  // DOWNLOAD
  await downloadFiles(url);
  console.log("Processing wiki file...");
  const executor = new CommandExecutorAsync();
  return executor.execCommand("sh scripts/prepareFiles.sh");
};

const writeHash = async (hash: string, tagId: number) => {
  fs.writeFile(
    `hashes/${hash}.txt`,
    `hash: ${hash}tag: ${tagId}`,
    function (err) {
      if (err) return console.log(err);
      console.log("Hash writen to disk!");
    }
  );
};

// const writeHash = async (hash: string, tagId: number) => {
//   fs.writeFile(
//     `hashes/${hash}.txt`,
//     `hash: ${hash}\ntag: ${tagId}`,
//     function (err) {
//       if (err) return console.log(err);
//       console.log("Hash writen to disk!");
//     }
//   );
// };

class CommandExecutorAsync {
  execCommand: (url: string) => Promise<any>;
  constructor() {
    this.execCommand = function (cmd) {
      return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(stdout);
        });
      });
    };
  }
}

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
