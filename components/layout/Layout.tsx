import React from "react";

import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";

import { Footer } from "../footer";
import { NavBar } from "../navBar";

const ContentWrapper = styled("div")(({ theme }) => ({
  maxWidth: "min(800px, 100vw)",
  padding: theme.spacing(4, 2),
  "> *": {
    width: "100%",
  },
}));

interface Props extends React.PropsWithChildren {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box width="100vw">
      <Box minHeight="100vh">
        <NavBar />
        <Box display="flex" flexDirection="column" alignItems="center">
          <ContentWrapper>{children}</ContentWrapper>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
