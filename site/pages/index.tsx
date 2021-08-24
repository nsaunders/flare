import type { NextPage } from "next";
import Head from "next/head";
import { css } from "demitasse";
import { useMeasure } from "react-use";
import cx from "clsx";
import { Button } from "../components/button";
import { Install } from "../components/install";
import { Item, Stack } from "../components/stack";

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
    fontSize: "48px",
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    "&::after": {
      content: "",
      marginRight: "-0.5em",
    },
  },
  nameLarge: {
    fontSize: 64,
  },
  tagline: {
    fontFamily: "Lato",
    fontSize: 14,
    lineHeight: 1,
    letterSpacing: 1,
    whiteSpace: "nowrap",
    "&::after": {
      content: "",
      marginRight: -2,
    },
  },
  taglineLarge: {
    letterSpacing: 3,
  },
});

const Home: NextPage = () => {
  const [pageRef, { width: pageWidth }] = useMeasure();
  const large = pageWidth >= 400;
  return (
    <>
      <Head>
        <title>Flare</title>
        <meta
          name="description"
          content="Applicative-style UIs in TypeScript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page} ref={(el: HTMLDivElement) => pageRef(el)}>
        <Stack spacing={large ? 64 : 48} direction="column" alignItems="center">
          <Item>
            <Stack spacing={8} direction="column" alignItems="center">
              <Item
                as="h1"
                className={cx(styles.name, large && styles.nameLarge)}
              >
                Flare
              </Item>
              <Item
                as="h2"
                className={cx(styles.tagline, large && styles.taglineLarge)}
              >
                Applicative-style UIs in TypeScript
              </Item>
            </Stack>
          </Item>
          <Item>
            <Stack
              spacing={large ? 8 : 48}
              direction={large ? "row" : "column-reverse"}
              alignItems="center"
            >
              <Item>
                <Button as="a" href="#" size="large" grow motif="primary">
                  Get started
                </Button>
              </Item>
              <Item>
                <Install packageName="flare" />
              </Item>
            </Stack>
          </Item>
        </Stack>
      </div>
    </>
  );
};

export default Home;
