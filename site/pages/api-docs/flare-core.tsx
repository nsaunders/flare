import Head from "next/head";
import Markdown from "flare-core/docs/README.md";
import APIDocLayout from "../../components/api-doc-layout";
import { Install } from "../../components/install";

const FlareCoreAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare-core API</title>
      <meta
        name="description"
        content="API documentation for the flare-core package"
      />
    </Head>
    <h1>flare-core</h1>
    <Install packageName="flare-core" />
    <Markdown />
  </>
);

FlareCoreAPI.getLayout = APIDocLayout;

export default FlareCoreAPI;
