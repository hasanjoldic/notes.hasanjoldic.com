import path from "path";

import type { GetServerSideProps, NextPage } from "next";

import { TableOfContents } from "../components";
import { getAllFiles } from "../utils/fs";

interface Props {
  routes: string[];
}

const Index: NextPage<Props> = ({ routes }) => {
  return (
    <main>
      <TableOfContents
        contents={routes.map((route) => ({
          title: route,
          href: `/notes${route}`,
        }))}
      />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const mdDir = path.resolve(process.cwd(), "markdown");
  const routes = (await getAllFiles(mdDir))
    .map((file) => file.replace(/\.md$/, ""))
    .map((file) => file.replace(`${mdDir}`, ""));

  return {
    props: {
      routes,
    },
  };
};

export default Index;
