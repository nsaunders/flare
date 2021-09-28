import { FC, ReactNode } from "react";
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

const APIDoc: FC<unknown> = ({ children }) => (
  <MDXProvider components={mdxComponents}>
    <Doc>{children}</Doc>
  </MDXProvider>
);

export default APIDoc;
