import {
  default as NextDocument,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="https://static.hasanjoldic.com/hasanjoldic.com/favicon.ico"
          />
          <meta name="description" content="Hasan Joldic | Notes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
