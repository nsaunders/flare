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

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [transitions, setTransitions] = useState(true);
  const hideHeader = scrollAmount > 8;

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
              headerHeight={hideHeader ? -52 : 52}
              transition={transitions}
            >
              <div className="header" style={hideHeader ? { height: 0 } : {}}>
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
                  style={{ top: hideHeader ? 0 : 52 }}
                  onScroll={({
                    currentTarget: { scrollTop },
                  }: UIEvent<HTMLElement>) => {
                    setScrollAmount(scrollTop);
                  }}
                >
                  <Component {...pageProps} />
                </motion.main>
              </AnimatePresence>
            </Imprint>
          </div>
        </div>
      </ModeSetting.Provider>
    </Highlighter>
  );
}
