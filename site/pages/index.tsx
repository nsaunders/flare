import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { css } from "demitasse";
import { useMeasure } from "react-use";
import { Button } from "../components/button";
import { Logo } from "../components/logo";
import { Install } from "../components/install";
import { Item, Stack } from "../components/stack";
import { Tagline } from "../components/tagline";

export const styles = /*#__PURE__*/ css({
  page: {
    position: "absolute",
    overflow: "hidden",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(var(--dark))",
    color: "rgb(var(--light))",
  },
  tagline: {
    margin: 0,
    fontFamily: "Lato",
    fontWeight: "normal",
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
      </Head>
      <div className={styles.page} ref={(el: HTMLDivElement) => pageRef(el)}>
        <Stack spacing={large ? 64 : 48} direction="column" alignItems="center">
          <Item>
            <Stack spacing={8} direction="column" alignItems="center">
              <Item>
                <Logo as="h1" width={large ? 325 : 244} />
              </Item>
              <Item>
                <Tagline as="h2" width={large ? 310 : 242} />
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
                <Link href="./getting-started">
                  <Button as="a" href="./getting-started" size="large" grow motif="primary">
                    Get started
                  </Button>
                </Link>
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
