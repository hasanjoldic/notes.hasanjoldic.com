import type { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";
import { Html, Head } from "next/document";

import CssBaseline from "@mui/material/CssBaseline";
import styled from "@mui/material/styles/styled";
import type { PaletteMode } from "@mui/material";

import { ThemeProvider } from "@hasan.joldic/theme";
import { Page } from "@hasan.joldic/components";

import { themeOptions } from "../utils";

import "../styles/global.css";

const Content = styled("div")(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
}));

interface CustomProps {
  paletteMode: PaletteMode;
}

interface Props extends AppProps, CustomProps {}

const App = ({ Component, pageProps, paletteMode }: Props) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <ThemeProvider themeOptions={themeOptions} paletteMode={paletteMode}>
        <CssBaseline />
        <Page pages={[]} onNavigate={handleNavigate}>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Page>
      </ThemeProvider>
    </>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const paletteMode =
    getCookie("paletteMode", context.ctx.req?.headers.cookie) || "light";

  return { paletteMode } as unknown as Props;
};

export default App;

function getCookie(name: string, cookie?: string) {
  return cookie
    ?.split(";")
    ?.find((row) => row.includes(name))
    ?.split("=")[1];
}
