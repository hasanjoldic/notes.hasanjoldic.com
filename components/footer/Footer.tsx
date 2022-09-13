import type { NextPage } from "next";

import Box from "@mui/material/Box";

import { Logo } from "../logo";
import { styles } from "../../utils";

export const Footer: NextPage = () => {
  return (
    <footer>
      <Box p={2} pb={1} borderTop={styles.shadow.default}>
        <Box display="flex" justifyContent="center">
          <div>
            {/* <Link href="https://enki.ba/">
              <a>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Logo />
                  <Typography ml={8}>Enki d.o.o.</Typography>
                </Box>
              </a>
            </Link> */}
            <Logo variant="link" />
          </div>
        </Box>
      </Box>
    </footer>
  );
};
