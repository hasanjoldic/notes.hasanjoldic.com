import { useState } from "react";

import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import Check from "@mui/icons-material/Check";
import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";

const Anchor = styled("a")(() => ({
  position: "absolute",
  top: 2,
  right: 2,
  width: 8,
  height: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 1,
  border: `1px solid grey.200`,
  boxShadow: "xs",

  opacity: 0,
  transition: "visibility 0s, opacity 0.2s linear",

  _hover: {
    bgColor: "grey.200",
    boxShadow: "md",
  },
}));

interface Props {
  code: string;
}

export const CopyCodeButton: React.FC<Props> = ({ code }) => {
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(code);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1000);
  };

  return (
    <IconButton onClick={handleClick}>
      {success ? <Check /> : <CopyAllOutlined color="success" />}
    </IconButton>
  );
};
