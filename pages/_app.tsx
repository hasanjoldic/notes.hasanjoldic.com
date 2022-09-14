import type { AppContext, AppProps } from "next/app";
import Head from "next/head";

import styled from "@mui/material/styles/styled";
import type { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider } from "@hasan.joldic/theme";
import { Page } from "@hasan.joldic/components";

import { useRouter } from "next/router";

import "../styles/globals.css";

const Content = styled("div")(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
}));

interface Props extends AppProps {
  paletteMode: PaletteMode;
}

const App = ({ Component, pageProps, paletteMode }: Props) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <ThemeProvider paletteMode={paletteMode}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Hasan Joldic</title>
      </Head>

      <CssBaseline />

      <Box>
        <Page pages={[]} onNavigate={handleNavigate}>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Page>
      </Box>
    </ThemeProvider>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const paletteMode = getCookie("paletteMode", context.ctx.req?.headers.cookie);

  return { paletteMode } as unknown as Props;
};

function getCookie(name: string, cookie?: string) {
  return cookie
    ?.split(";")
    ?.find((row) => row.includes(name))
    ?.split("=")[1];
}

export default App;
