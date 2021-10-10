import Head from "next/head";
import Markdown from "flare/docs/README.md";
import APIDocLayout from "../../components/api-doc-layout";
import { Install } from "../../components/install";

const FlareAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare API</title>
      <meta
        name="description"
        content="API documentation for the flare package"
      />
    </Head>
    <h1>flare</h1>
    <Install packageName="flare" />
    <Markdown />
  </>
);

FlareAPI.getLayout = APIDocLayout;

export default FlareAPI;
