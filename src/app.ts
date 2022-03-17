import express, { Application, Request, Response } from "express";
import fs from "fs";
import { exec } from "child_process";
import download from "download";
import { Bee, BeeDebug } from "@ethersphere/bee-js";

const app: Application = express();

const port = 8080;

const beeUrl = "http://bee-1:1633";
const beeDebugUrl = "http://bee-1:1635";
const publicGateway = "https://gateway.ethswarm.org/bzz";

const bee = new Bee(beeUrl);
const debugBee = new BeeDebug(beeDebugUrl);

app.get("/upload", async (req: Request, res: Response) => {
  const { url } = req.query;
  if (url !== undefined) {
    await prepareFiles(<string>url);
    const { tag, hash } = await uploadToSwarm();
    res.send({
      status: 200,
      data: `File is being uploaded, the tag in order to check upload progress is: ${tag}, and the hash is: ${hash}`,
      tag,
      hash,
      localUrl: `${publicGateway}/bzz/${hash}`,
      gatewayUrl: `${publicGateway}/${hash}`,
    });
  } else {
    res.send("I need an url\n");
  }
});

app.get("/check-upload", async (req: Request, res: Response) => {
  const { tag } = req.query;
  if (tag !== undefined) {
    const tagStatus = await checkUploadStatus(<string>tag);
    res.send(tagStatus);
  } else {
    res.send("I need a tag number\n");
  }
});

app.get("/get-address-to-fund", async (req: Request, res: Response) => {
  const addresses = await debugBee.getNodeAddresses();
  res.send(addresses.ethereum);
});

const uploadToSwarm = async () => {
  console.log("Swarm node up:", await bee.isConnected());

  const tag = await bee.createTag();
  const batchId = await debugBee.createPostageBatch("10000000", 20);
  // const batchId =
  //   "aafb6571891bdda09c187549bc5a6efe87f6ee6f9af2b098d9f2761aa5bdfc4a";
  // console.log(batchId);
  const { tagUid, reference: hash } = await bee.uploadFilesFromDirectory(
    batchId,
    "wiki",
    { tag: tag.uid }
  );
  // Write hash to a file to preserve it.
  writeHash(hash, tagUid);
  return { tag: tagUid, hash };
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
    ].map(({ url, file }) => download(url, `./downloads`, { filename: file }))
  );
};

const prepareFiles = async (url: string) => {
  console.log("Downloading wiki extract...");
  await downloadFiles(url);
  console.log("Processing wiki file...");
  const scriptResult = exec(
    "sh scripts/prepareFiles.sh",
    (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    }
  );
};

const writeHash = async (hash: string, tagId: number) => {
  fs.writeFile(
    `hashes/${hash}.txt`,
    `hash: ${hash}\ntag: ${tagId}`,
    function (err) {
      if (err) return console.log(err);
      console.log("There's been an error while writing the hash");
    }
  );
};

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
