import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { css } from "demitasse";
import { useMeasure } from "react-use";
import { Button } from "../components/button";
import { Install } from "../components/install";
import { Item, Stack } from "../components/stack";
import { Tagline } from "../components/tagline";
import { ImprintZone } from "../components/imprint";

export const styles = /*#__PURE__*/ css({
  page: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const [pageRef, { width: pageWidth }] = useMeasure<HTMLDivElement>();
  const large = pageWidth >= 400;

  const { asPath } = useRouter();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (asPath !== "/") {
      setLeaving(true);
    }
  }, [asPath]);

  return (
    <>
      <Head>
        <title>Flare</title>
        <meta
          name="description"
          content="Applicative-style UIs in TypeScript"
        />
      </Head>
      <div className={styles.page} ref={pageRef}>
        <Stack spacing={large ? 64 : 48} direction="column" alignItems="center">
          <Item>
            <Stack spacing={8} direction="column" alignItems="center">
              <Item>
                {leaving ? (
                  <div style={{ height: large ? 64 : 48 }} />
                ) : (
                  <ImprintZone size={large ? "large" : "medium"} />
                )}
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
                <Link href="./getting-started" passHref>
                  <Button as="a" size="large" grow motif="primary">
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
