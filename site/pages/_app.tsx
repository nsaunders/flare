require("../global.css");
require("../extracted-styles");
import {NextPage} from "next";
import type { AppProps } from "next/app"
import Head from "next/head";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import {ModeSetting} from "../components/mode";

type Layout = {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}

export default function App({ Component, pageProps }: AppProps & Layout) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const { body } = document;
    if (mode === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
    }
    else if (mode === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [mode]);

  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ModeSetting.Provider value={[mode, setMode]}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ModeSetting.Provider>
  );
}
