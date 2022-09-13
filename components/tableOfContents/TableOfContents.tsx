import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ChevronRight from "@mui/icons-material/ChevronRight";

import { flatten } from "../../utils";
import { Link } from "../routing";

// const ListItemIcon = styled(MuiListItemIcon)(() => ({
//   minWidth: "unset",
// }));

interface LeafSection {
  title: string;
  href: string;
}

interface Section extends LeafSection {
  children?: Section[];
}

interface Props {
  // title: string;
  contents: Section[];
}

export const TableOfContents: React.FC<Props> = ({ contents }) => {
  return <List>{renderTOFLink(contents)}</List>;
  // return (
  //   <Accordion
  //     sx={{
  //       marginY: 4,
  //       borderRadius: 4,
  //       boxShadow: "",
  //     }}
  //   >
  //     <AccordionSummary>
  //       <Typography>{title}</Typography>
  //     </AccordionSummary>
  //     <AccordionDetails>
  //       <List>{renderTOFLink(contents)}</List>
  //     </AccordionDetails>
  //   </Accordion>
  // );
};

const TOFLink: React.FC<{ title: string; href: string; depth: number }> = ({
  title,
  href,
  depth,
}) => {
  return (
    <Box ml={depth * 2} display="flex" alignItems="center">
      <ChevronRight />
      <Link href={href}>{title}</Link>
    </Box>
  );
};

function renderTOFLink(contents: Section[], depth = 0): JSX.Element[] {
  if (!contents) return [] as JSX.Element[];

  return [
    ...contents.map((section) => {
      const { title, href } = section;
      return <TOFLink key={href} title={title} href={href} depth={depth} />;
    }),
    ...flatten<JSX.Element>(
      contents
        .filter((section) => section.children)
        .map((section) =>
          flatten<Section>(
            renderTOFLink(section.children as Section[], depth + 1)
          )
        )
    ),
  ];
}
