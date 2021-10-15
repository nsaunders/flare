import Markdown from "../docs/getting-started.mdx";
import { Doc } from "../components/doc";
import { SmartHead } from "../components/smart-head";

const GettingStarted = (): JSX.Element => (
  <>
    <SmartHead
      title="Getting Started"
      description="Start building applicative-style UIs in TypeScript using Flare."
    />
    <Doc>
      <Markdown />
    </Doc>
  </>
);

export default GettingStarted;
