import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";

const getAllPages = () => {
  return getAllFiles().sort();
};

const getAllFiles = () => {
  const rawFiles = fs.readdirSync(path.join(`./wiki-files/A/`));
  // const files = rawFiles.map((filename) => {
  //   return filename;
  //   // const { data } = matter.read(path.join(`content/_${type}`, filename));
  //   // return {
  //   //   data,
  //   //   filename,
  //   //   type,
  //   //   slug: getSlug(filename),
  //   // };
  // });
  return rawFiles;
};

const getFileHtml = async (slug: string) => {
  return readFile(path.join(`./wiki-files/A/${slug}`), "utf8");
};

export { getAllPages, getFileHtml };
