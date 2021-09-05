import Markdown from "../docs/getting-started.mdx";
import { ReactElement } from "react";
import { Doc } from "../components/doc";

const GettingStarted = (): JSX.Element => <Markdown />;

GettingStarted.getLayout = (page: ReactElement) => <Doc>{page}</Doc>;

export default GettingStarted;
