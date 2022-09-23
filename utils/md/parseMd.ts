import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkRaw from "rehype-raw";

export async function parseMd(
  text: string
): Promise<{ title: string; date: string; urls: string[]; html: string }> {
  const matterResult = matter(text);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(remarkRaw)
    .use(rehypeStringify)
    .process(matterResult.content);

  const html = processedContent.toString();

  return {
    title: (matterResult as any)?.title || "",
    date: (matterResult as any)?.date || "",
    urls: (matterResult as any)?.urls || [],
    html,
    ...matterResult.data,
  };
}

export async function parseMds(mds: string[]) {
  const mdsData = await Promise.all(mds.map(parseMd));
  return mdsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
