import styled from "@mui/material/styles/styled";
import grey from "@mui/material/colors/grey";

// import { isLightMode } from "../../styles";

const Code = styled("code")(({ theme }) => ({
  padding: theme.spacing(0.25),
  // backgroundColor: isLightMode(theme.palette.mode) ? grey[200] : grey[800],
  backgroundColor: grey[200],
  borderRadius: theme.shape.borderRadius,
}));

export const InlineCode: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Code>{children}</Code>;
};
