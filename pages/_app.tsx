import type { AppContext, AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider, PaletteMode } from "@hasan.joldic/theme";

import { Head, Layout } from "../components/";
import { themeOptions } from "../utils";

import "../styles/global.css";

interface CustomProps {
  paletteMode: PaletteMode;
}

interface Props extends AppProps, CustomProps {}

const App = ({ Component, pageProps, paletteMode }: Props) => {
  return (
    <div>
      <Head />
      <ThemeProvider themeOptions={themeOptions} paletteMode={paletteMode}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const paletteMode =
    getCookie("paletteMode", context.ctx.req?.headers.cookie) || "system";

  return { paletteMode } as unknown as Props;
};

export default App;

function getCookie(name: string, cookie?: string) {
  return cookie
    ?.split(";")
    ?.find((row) => row.includes(name))
    ?.split("=")[1];
}
