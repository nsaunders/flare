import type { NextPage } from 'next'
import Head from 'next/head'
import { css } from "demitasse";
import { Button } from "../components/button";
import { Install } from "../components/install";

export const styles = /*#__PURE__*/ css({
  page: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Gruppo",
    fontSize: "64px",
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: 32,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 16,
    marginLeft: 0,
    "&::after": {
      content: "",
      marginRight: -32,
    },
  },
  tagline: {
    fontFamily: "Lato",
    fontSize: 14,
    lineHeight: 1,
    letterSpacing: 3,
    whiteSpace: "nowrap",
    "&::after": {
      content: "",
      marginRight: -2,
    },
  },
  cta: {
    marginTop: 64,
    display: "flex",
  },
  install: {
    marginLeft: 8,
  },
});

const Home: NextPage = () => (
  <>
    <Head>
      <title>Flare</title>
      <meta name="description" content="Applicative-style UIs in TypeScript" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.page}>
      <h1 className={styles.name}>Flare</h1>
      <div className={styles.tagline}>Applicative-style UIs in TypeScript</div>
      <div className={styles.cta}>
        <div>
          <Button as="a" href="#" size="large" grow motif="primary">
            Get started
          </Button>
        </div>
        <div className={styles.install}>
          <Install packageName="flare" />
        </div>
      </div>
    </div>
  </>
);

export default Home;
