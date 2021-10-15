import Markdown from "../docs/embedding-in-react.mdx";
import { SmartHead } from "../components/smart-head";
import { Doc } from "../components/doc";

const EmbeddingInReact = () => (
  <>
    <SmartHead
      title="Embedding in React"
      description="Seamlessly integrate a Flare UI into a React application."
    />
    <Doc>
      <Markdown />
    </Doc>
  </>
);

export default EmbeddingInReact;
