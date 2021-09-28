import Head from "next/head";
import Markdown from "flare-core/docs/README.md";
import APIDoc from "../components/api-doc";

const CoreAPI = (): JSX.Element => (
  <>
    <Head>
      <title>Core API</title>
      <meta name="description" content="Core API documentation" />
    </Head>
    <APIDoc>
      <Markdown />
    </APIDoc>
  </>
);

export default CoreAPI;
