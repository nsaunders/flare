import Head from "next/head";
import Markdown from "flare/docs/README.md";
import APIDoc from "../components/api-doc";

const BasicAPI = (): JSX.Element => (
  <>
    <Head>
      <title>Basic API</title>
      <meta name="description" content="Basic API documentation" />
    </Head>
    <APIDoc>
      <Markdown />
    </APIDoc>
  </>
);

export default BasicAPI;
