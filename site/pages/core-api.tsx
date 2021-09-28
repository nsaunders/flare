import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import Markdown from "flare-core/docs/README.md";
import { Doc } from "../components/doc";
import { MDXProvider } from "@mdx-js/react";

const mkHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) =>
  function Heading({ children }: { children: ReactNode }): ReactNode {
    const Tag = `h${level}` as `h${typeof level}`;
    let id: string | undefined = undefined;
    if (typeof children === "string") {
      id = children.toLowerCase();
    }
    return <Tag id={id}>{children}</Tag>;
  };

const mdxComponents = {
  h1: mkHeading(1),
  h2: mkHeading(2),
  h3: mkHeading(3),
  h4: mkHeading(4),
  h5: mkHeading(5),
  h6: mkHeading(6),
};

const CoreAPI = (): JSX.Element => (
  <>
    <Head>
      <title>Core API</title>
      <meta name="description" content="Core API documentation" />
    </Head>
    <MDXProvider components={mdxComponents}>
      <Markdown />
    </MDXProvider>
  </>
);

CoreAPI.getLayout = (page: ReactElement) => <Doc>{page}</Doc>;

export default CoreAPI;
