import Markdown from "flare-core/docs/README.md";
import APIDocLayout from "../../components/api-doc-layout";
import { Install } from "../../components/install";
import { SmartHead } from "../../components/smart-head";

const FlareCoreAPI = (): JSX.Element => (
  <>
    <SmartHead
      title="flare-core API"
      description="Learn the API for the flare-core package, which provides the basic building blocks for applicative-style UIs in TypeScript with the ability to customize the rendered HTML controls."
    />
    <h1>flare-core</h1>
    <Install packageName="flare-core" />
    <Markdown />
  </>
);

FlareCoreAPI.getLayout = APIDocLayout;

export default FlareCoreAPI;
