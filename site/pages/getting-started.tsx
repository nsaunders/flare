import Head from "next/head";
import Markdown from "../docs/getting-started.mdx";
import { Doc } from "../components/doc";

const GettingStarted = (): JSX.Element => (
  <>
    <Head>
      <title>Getting Started</title>
      <meta
        name="description"
        content="How to start building applicative-style UIs in TypeScript using Flare"
      />
    </Head>
    <Doc>
      <Markdown />
    </Doc>
  </>
);

export default GettingStarted;
