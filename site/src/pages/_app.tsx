import "@/styles/globals.css";

import type { AppProps } from "next/app";
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

export default function App({ Component, pageProps }: AppProps) {
  const { asPath: key } = useRouter();
  return (
    <Mode>
      <Shell>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={key}
            variants={motionVariants}
            initial="out"
            animate="in"
            exit="out"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Shell>
    </Mode>
  );
}
