import React from "react";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Logo } from "../logo";
import { styles } from "../../utils";
import { PaletteModeButton } from "@hasan.joldic/theme";

export const NavBar: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      px={4}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={styles.shadow.default}
    >
      <Box display="flex" alignItems="center">
        <Box mr={2}>
          <Logo variant="link" />
        </Box>
        <Typography variant="h5" noWrap>
          Enki
        </Typography>
      </Box>

      <PaletteModeButton />
    </Box>
  );
};
