declare module "*.md" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "@mdx-js/react" {
  import { ComponentType, ReactNode, StyleHTMLAttributes } from "react";

  type MDXProps = {
    children: React.ReactNode;
    components: Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", (props: { children : ReactNode}) => ReactNode>;
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
