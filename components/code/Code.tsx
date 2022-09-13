import React, { useEffect, useState } from "react";

import { Theme } from "@mui/material/styles/createTheme";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import MuiIconButton from "@mui/material/IconButton";
import grey from "@mui/material/colors/grey";
import Check from "@mui/icons-material/Check";
import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";

// import hljs from "highlight.js/lib/core";
// import javascript from "highlight.js/lib/languages/javascript";
// import bash from "highlight.js/lib/languages/bash";

// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("bash", bash);

const Container = styled(Paper)(({ theme }) => ({
  position: "relative",
  margin: theme.spacing(4, 0),
  padding: theme.spacing(2, 4),
  // backgroundColor: isLightMode(theme.palette.mode) ? grey[200] : grey[900],
  backgroundColor: grey[200],

  "&:hover": {
    ".MuiIconButton-root": {
      opacity: 1,
    },
  },
}));

const Pre = styled("pre")(({ theme }) => ({
  margin: 0,
  overflowX: "scroll",

  "&": {
    paddingLeft: theme.spacing(4),
  },

  "& > code > .bash-command": {
    position: "relative",
  },

  "& > code > .bash-command:after": {
    content: "url(/icons/currency-usd.svg)",
    position: "absolute",
    top: calculateBottomPos(theme),
    left: theme.spacing(-2),
    width: theme.typography.body1.fontSize,
    height: theme.typography.body1.fontSize,
  },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  width: theme.spacing(4),
  height: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],

  opacity: 0,
  transition: "visibility 0s, opacity 0.2s linear",

  "&:hover": {
    bgColor: grey[200],
    boxShadow: theme.shadows[4],
  },
}));

interface Props {
  children: string;
  language: string;
}

export const Code: React.FC<Props> = ({ children, language }) => {
  const code = typeof children === "string" ? children.trim() : "";
  const [highlightedCode, setHighlightedCode] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(formatCode(code, language));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };

  useEffect(() => {
    // setHighlightedCode(highlightCode(code, language));
    // setHighlightedCode(hljs.highlight(code, { language }).value);
  }, [code, language, setHighlightedCode]);

  return (
    <Container elevation={1}>
      <Pre className="default-border">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </Pre>
      <IconButton onClick={handleClick}>
        {success ? <Check color="success" /> : <CopyAllOutlined />}
      </IconButton>
    </Container>
  );
};

function formatHighlightedLOCBash(line: string) {
  return `<div class="bash-command"></div>${line}`;
}

function formatCode(code: string, language: string) {
  if (!code || typeof code !== "string") {
    return "";
  }

  return code
    .split("\n")
    .map((loc) => formatLOC(loc, language))
    .map(([formattedLOC]) => formattedLOC)
    .join("\n");
}

function formatLOC(
  loc: string,
  language: string
): [string] | [string, (loc: string) => string] {
  if (language === "bash") {
    const formattedLOC = loc.replace(/^\$\s/, "");
    return [formattedLOC, formatHighlightedLOCBash];
  }
  return [loc];
}

// function highlightCode(code: string, language: string) {
//   const locs = code.split("\n");

//   const hightlightedLOCs = locs.map((loc) => {
//     const [formattedLOC, formatHighlightedLOC] = formatLOC(loc, language);
//     const highligtedLOC = hljs.highlight(formattedLOC, { language }).value;
//     return formatHighlightedLOC
//       ? formatHighlightedLOC(highligtedLOC)
//       : highligtedLOC;
//   });

//   const highlightedCode = hightlightedLOCs.join("");

//   console.log(highlightedCode);

//   return highlightedCode;
// }

function calculateBottomPos(theme: Theme) {
  return `calc((${theme.typography.body1.lineHeight} * ${theme.typography.body1.fontSize} - ${theme.typography.body1.fontSize}) / 4 )`;
}
