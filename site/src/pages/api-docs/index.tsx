import Markdown from "../../components/APIOverview.mdx";
import APIDocLayout from "../../components/APIDocLayout";
import SmartHead from "../../components/SmartHead";

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
