import Head from "next/head";
import Markdown from "flare/docs/README.md";
import APIDoc from "../../components/api-doc";
import APIDocLayout from "./_layout";

const FlareAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare API</title>
      <meta
        name="description"
        content="API documentation for the flare package"
      />
    </Head>
    <APIDoc>
      <Markdown />
    </APIDoc>
  </>
);

FlareAPI.getLayout = APIDocLayout;

export default FlareAPI;
