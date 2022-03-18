const HtmlToReact = require("html-to-react");
const HtmlToReactParser = require("html-to-react").Parser;
const ReactDOMServer = require("react-dom/server");

import { NextPage } from "next";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import React from "react";

import { getAllPages, getFileHtml } from "../../utils/data";

interface WikiPageProps {
  wikiEntry: string;
  slug: string;
}

const WikiPage: NextPage<WikiPageProps> = ({
  wikiEntry,
  slug,
}: WikiPageProps) => {
  const router = useRouter();

  const routerHandler = (pageName: string, router: NextRouter) => {
    const path = router.pathname.split("/");
    if (path.length > 0) {
      path.pop();
    }
    path.push(pageName);
    return path.join("/");
  };

  const pushToPage = (newPage: string) => {
    router.push(routerHandler(newPage, router));
  };

  const newAComponent = (newPage: string) => {
    return (
      <Link href={routerHandler(`${newPage}`, router)} passHref>
        <a>{newPage}</a>
      </Link>
    );
  };

  const htmlToReactParser = new HtmlToReactParser();
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const isValidNode = function () {
    return true;
  };

  const preprocessingInstructions = [
    {
      shouldPreprocessNode: function (node: any) {
        return (
          node.name === "meta" &&
          node.attribs &&
          node.attribs["http-equiv"] &&
          node.attribs["http-equiv"] == "refresh"
        );
      },
      preprocessNode: function (node: any, children: any) {
        const newPage = node.attribs.content.split("=").pop();
        setTimeout(function () {
          pushToPage(`${newPage}.html`);
        }, 500);
        node.attribs = { ...node.attribs, "http-equiv": "none" };
      },
    },
  ];

  const processingInstructions = [
    {
      shouldProcessNode: function (node: any) {
        return (
          node.attribs &&
          node.attribs.href &&
          node.attribs.title &&
          !node.attribs.href.startsWith("http") &&
          node.name === "a"
        );
      },
      processNode: function (node: any, children: any) {
        // To handle cases like Porto_Novo
        let href = node.attribs.title;
        if (
          node.attribs.href != node.attribs.title &&
          node.attribs.href.split("_").join(" ") == node.attribs.title
        ) {
          href = node.attribs.href;
        }
        return (
          <Link
            href={routerHandler(`${node.attribs.href}.html`, router)}
            passHref
          >
            <a>{node.attribs.title}</a>
          </Link>
        );
      },
    },
    {
      shouldProcessNode: function (node: any) {
        return node.name === "script";
      },
      processNode: function (node: any, children: any) {},
    },
    {
      shouldProcessNode: function (node: any) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];
  const wikiElement = htmlToReactParser.parseWithInstructions(
    wikiEntry,
    isValidNode,
    processingInstructions,
    preprocessingInstructions
  );
  return (
    <main
      dangerouslySetInnerHTML={{
        __html: ReactDOMServer.renderToStaticMarkup(wikiElement),
      }}
    ></main>
  );
};

export async function getStaticPaths() {
  const pages = getAllPages();
  return {
    paths: pages.map((page) => {
      return {
        params: {
          slug: page,
        },
      };
    }),
    fallback: false,
  };
}

interface Context {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params: { slug } }: Context) {
  const fileHtml = await getFileHtml(slug);
  return {
    props: {
      wikiEntry: fileHtml,
      slug,
    },
  };
}

export default WikiPage;
