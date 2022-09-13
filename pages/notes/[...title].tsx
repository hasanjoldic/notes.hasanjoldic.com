import path from "path";

import { GetStaticProps } from "next";

import { parseMd } from "../../utils/md";
import { getAllFiles, readFileContents } from "../../utils/fs";
import { Head, Markdown } from "../../components";

export default function Note({
  title,
  date,
  urls,
  html,
}: Awaited<ReturnType<typeof parseMd>>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Markdown title={title} date={date} urls={urls} html={html} />
    </>
  );
}

export const getStaticProps: GetStaticProps<
  Awaited<ReturnType<typeof parseMd>>,
  { title: string[] }
> = async ({ params }) => {
  const title = params?.title || [];
  const targetPath = path.resolve(
    process.cwd(),
    "markdown",
    `${title.join("/")}.md`
  );

  const text = await readFileContents(targetPath);
  const data = await parseMd(text);

  return {
    props: {
      ...data,
    },
  };
};

export async function getStaticPaths() {
  const mdDir = path.resolve(process.cwd(), "markdown");

  const files = (await getAllFiles(mdDir)).map((file) =>
    file.replace(/\.md$/, "")
  );

  return {
    paths: files.map((file) => ({
      params: { title: file.replace(`${mdDir}/`, "").split("/") },
    })),
    fallback: false,
  };
}
