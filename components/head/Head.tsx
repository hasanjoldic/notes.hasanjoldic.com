import _Head from "next/head";
import React from "react";

export const Head: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <_Head>
      {/* PWA primary color */}
      {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <title>Enki d.o.o. | Hasan Joldic</title>
      <meta name="description" content="Personal page" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="emotion-insertion-point" content="" />
      {(props as any).emotionStyleTags}
      {children}
    </_Head>
  );
};
