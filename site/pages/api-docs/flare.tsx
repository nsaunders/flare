import Head from "next/head";
import Markdown from "flare/docs/README.md";
import APIDocLayout from "../../components/api-doc-layout";

const FlareAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare API</title>
      <meta
        name="description"
        content="API documentation for the flare package"
      />
    </Head>
    <Markdown />
  </>
);

FlareAPI.getLayout = APIDocLayout;

export default FlareAPI;
