require("../global.css");
require("../extracted-styles");
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, UIEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Imprint } from "../components/imprint";
import { MenuToggle, Menu } from "../components/menu";
import { ModeSetting, ModeToggle } from "../components/mode";
import cx from "clsx";
import { Highlighter } from "../components/highlight";
import { NextPage } from "next";

type Layout = {
  Component: NextPage & {
    getLayout: (page: ReactElement) => ReactElement;
  };
};

export default function App({
  Component,
  pageProps,
  router,
}: AppProps & Layout): ReactElement {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [transitions, setTransitions] = useState(true);
  const hideHeader = scrollAmount > 16;

  useEffect(() => {
    setTransitions(false);
    const timeout = setTimeout(() => {
      setTransitions(true);
    }, 500);
    return () => {
      clearTimeout(timeout);
      setTransitions(true);
    };
  }, [scrollAmount]);

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
    <Highlighter>
      <ModeSetting.Provider value={[mode, setMode]}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <div className={cx("shell", menu && "menu-expanded")}>
          <nav className="menu">
            <Menu open={menu} />
          </nav>
          <div className="content">
            <Imprint
              headerHeight={hideHeader ? -78 : 78}
              transition={transitions}
            >
              <div className="header" style={hideHeader ? { height: 0 } : {}}>
                <MenuToggle setting={menu} onChange={setMenu} />
                <ModeToggle />
              </div>
              <div
                className="main"
                style={{ top: hideHeader ? 0 : 78 }}
                onScroll={({
                  currentTarget: { scrollTop },
                }: UIEvent<HTMLElement>) => {
                  setScrollAmount(scrollTop);
                }}
              >
                <AnimatePresence exitBeforeEnter>
                  {getLayout(
                    <motion.main
                      key={router.asPath}
                      transition={{ duration: 0.5 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Component {...pageProps} />
                    </motion.main>,
                  )}
                </AnimatePresence>
              </div>
            </Imprint>
          </div>
        </div>
      </ModeSetting.Provider>
    </Highlighter>
  );
}
