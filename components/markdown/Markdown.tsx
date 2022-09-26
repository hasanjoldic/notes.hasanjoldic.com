import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { parseMd } from "../../utils/md";
import { Link } from "../routing";

import styles from "./Markdown.module.css";

interface Props extends Awaited<ReturnType<typeof parseMd>> {}

export const Markdown: React.FC<Props> = ({ title, date, urls, html }) => {
  return (
    <Box maxWidth="100%">
      <div>{date}</div>
      {urls?.map((url) => (
        <Box key={url}>
          <Link href={url}>{url}</Link>
        </Box>
      ))}
      <Box my={4}>
        <Divider />
      </Box>
      <Box
        maxWidth="100%"
        className={styles.markdownContainer}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Box>
  );
};
