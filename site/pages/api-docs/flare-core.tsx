import Head from "next/head";
import Markdown from "flare-core/docs/README.md";
import APIDoc from "../../components/api-doc";
import APIDocLayout from "./_layout";

const FlareCoreAPI = (): JSX.Element => (
  <>
    <Head>
      <title>flare-core API</title>
      <meta
        name="description"
        content="API documentation for the flare-core package"
      />
    </Head>
    <APIDoc>
      <Markdown />
    </APIDoc>
  </>
);

FlareCoreAPI.getLayout = APIDocLayout;

export default FlareCoreAPI;
