require("../global.css");
require("../extracted-styles");
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Imprint } from "../components/imprint";
import { MenuToggle, Menu } from "../components/menu";
import { ModeSetting, ModeToggle } from "../components/mode";
import cx from "clsx";

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
  const [menu, setMenu] = useState(false);

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
      <div className={cx("shell", menu && "menu-expanded")}>
        <nav className="menu">
          <Menu open={menu} />
        </nav>
        <div className="content">
          <Imprint headerHeight={52}>
            <div className="header">
              <MenuToggle setting={menu} onChange={setMenu} />
              <ModeToggle />
            </div>
            <AnimatePresence exitBeforeEnter>
              <motion.main
                key={router.asPath}
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="main"
              >
                {getLayout(<Component {...pageProps} />)}
              </motion.main>
            </AnimatePresence>
          </Imprint>
        </div>
      </div>
    </ModeSetting.Provider>
  );
}
