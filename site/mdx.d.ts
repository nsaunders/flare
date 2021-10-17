declare module "*.md" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "@mdx-js/react" {
  import { Component, ReactNode } from "react";

  type MDXProps = {
    children: ReactNode;
    components: Partial<Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "code", (props: { children : ReactNode}) => ReactNode>>;
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
