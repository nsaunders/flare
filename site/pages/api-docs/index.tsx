import Head from "next/head";
import Markdown from "../../docs/api/overview.mdx";
import APIDocLayout from "../../components/api-doc-layout";

const APIOverview = (): JSX.Element => (
  <>
    <Head>
      <title>API Overview</title>
      <meta
        name="description"
        content="Overview of the Flare APIs"
      />
    </Head>
    <Markdown />
  </>
);

APIOverview.getLayout = APIDocLayout;

export default APIOverview;
