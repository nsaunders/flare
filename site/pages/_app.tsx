require("../global.css");
require("../extracted-styles");
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Imprint } from "../components/imprint";
import { MenuToggle } from "../components/menu";
import { ModeSetting, ModeToggle } from "../components/mode";

type Layout = {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & Layout): ReactElement {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const { body } = document;
    if (mode === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
    } else if (mode === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [mode]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ModeSetting.Provider value={[mode, setMode]}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="shell">
        <Imprint headerHeight={52}>
          <div className="header">
            <MenuToggle />
            <ModeToggle />
          </div>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.asPath}
              transition={{ duration: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="content"
            >
              {getLayout(<Component {...pageProps} />)}
            </motion.div>
          </AnimatePresence>
        </Imprint>
      </div>
    </ModeSetting.Provider>
  );
}
