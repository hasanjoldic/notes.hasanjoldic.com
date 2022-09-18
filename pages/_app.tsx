import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import styled from "@mui/material/styles/styled";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider } from "@hasan.joldic/theme";
import { Page } from "@hasan.joldic/components";

const Content = styled("div")(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
}));

interface Props extends AppProps {
  cookie: string | undefined;
}

const App = ({ Component, pageProps, cookie }: Props) => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <ThemeProvider cookie={cookie}>
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

App.getInitialProps = async (
  context: AppContext
): Promise<Omit<Props, keyof AppProps>> => {
  const cookie = context.ctx.req?.headers.cookie;

  return { cookie };
};

export default App;
