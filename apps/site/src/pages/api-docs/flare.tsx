import Markdown from "flare/docs/README.md";
import APIDocLayout from "../../components/APIDocLayout";
import Install from "../../components/Install";
import SmartHead from "../../components/SmartHead";

const FlareAPI = (): JSX.Element => (
  <>
    <SmartHead
      title="flare API"
      description="Learn the API for the flare package, which provides the basic building blocks for applicative-style UIs in TypeScript."
    />
    <h1>flare</h1>
    <Install packageName="flare" />
    <Markdown />
  </>
);

FlareAPI.getLayout = APIDocLayout;

export default FlareAPI;
