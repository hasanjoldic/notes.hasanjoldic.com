import path from "path";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { parseMd } from "../../utils/md";
import { fileExists, getAllFiles, readFileContents } from "../../utils/fs";
import { Markdown, TableOfContents } from "../../components";

export default function Note({
  title,
  date,
  urls,
  html,
  routes,
}: Awaited<ReturnType<typeof parseMd>> & { routes: string[] }) {
  const router = useRouter();

  const breadcrumbs = router.asPath
    .split("/")
    .filter((o) => o)
    .slice(1);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.slice(0, breadcrumbs.length - 1).map((path, index) => (
          <Link key={path} href={path}>
            {decodeURI(path)}
          </Link>
        ))}
        <Typography>{decodeURI(breadcrumbs.reverse()[0])}</Typography>
      </Breadcrumbs>

      <TableOfContents
        contents={routes.map((route) => ({
          title: route,
          href: decodeURI(`${router.asPath}${route}`),
        }))}
      />

      <Markdown title={title} date={date} urls={urls} html={html} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  Awaited<ReturnType<typeof parseMd>>,
  { title: string[] }
> = async ({ params }) => {
  const relativePath = params?.title?.join("/") ?? "";
  const targetPath = path.resolve(process.cwd(), "markdown", relativePath);

  const isFile = await fileExists([targetPath, ".md"].join(""));

  const text = isFile
    ? await readFileContents([targetPath, ".md"].join(""))
    : null;
  const data = text ? await parseMd(text) : null;

  const dir = path.resolve(process.cwd(), "markdown", relativePath);
  const routes = (await getAllFiles(dir))
    .map((file) => file.replace(/\.md$/, ""))
    .map((file) => file.replace(`${dir}`, ""));

  return {
    props: {
      routes,
      title: data?.title || params?.title?.[0] || "",
      date: data?.date || "",
      urls: data?.urls || [],
      html: data?.html || "",
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const mdDir = path.resolve(process.cwd(), "markdown");

//   const files = await getAllFilesAndDirs(mdDir);

//   const paths = files.map((file) =>
//     file.replace(`${mdDir}/`, "").replace(/\.md$/, "")
//   );

//   return {
//     paths: paths.map((path) => ({ params: { title: path.split("/") } })),
//     fallback: false,
//   };
// };
