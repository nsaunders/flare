import "@/styles/globals.css";

import type { ReactElement } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Mode from "@/components/Mode";
import Shell from "@/components/Shell";

const motionVariants = {
  in: {
    opacity: 1,
    transition: {
      delay: 0.25,
      duration: 0.25,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

type Layout = {
  Component: NextPage & {
    getLayout: (page: ReactElement) => ReactElement;
  };
};

export default function App({ Component, pageProps }: AppProps & Layout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const { asPath: key } = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Mode>
        <Shell>
          <AnimatePresence initial={false} mode="wait">
            {getLayout(
              <motion.div
                key={key}
                variants={motionVariants}
                initial="out"
                animate="in"
                exit="out"
              >
                <Component {...pageProps} />
              </motion.div>,
            )}
          </AnimatePresence>
        </Shell>
      </Mode>
    </>
  );
}
