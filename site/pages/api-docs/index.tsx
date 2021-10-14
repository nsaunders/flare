import Markdown from "../../docs/api/overview.mdx";
import APIDocLayout from "../../components/api-doc-layout";
import { SmartHead } from "../../components/smart-head";

const APIOverview = (): JSX.Element => (
  <>
    <SmartHead
      title="API"
      description="Learn the API for applicative UI programming in TypeScript."
    />
    <Markdown />
  </>
);

APIOverview.getLayout = APIDocLayout;

export default APIOverview;
