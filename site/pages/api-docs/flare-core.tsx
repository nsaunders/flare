import Head from "next/head";
import Markdown from "flare-core/docs/README.md";
import APIDocLayout from "../../components/api-doc-layout";

const FlareCoreAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare-core API</title>
      <meta
        name="description"
        content="API documentation for the flare-core package"
      />
    </Head>
    <Markdown />
  </>
);

FlareCoreAPI.getLayout = APIDocLayout;

export default FlareCoreAPI;
