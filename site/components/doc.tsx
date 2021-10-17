import { css } from "demitasse";
import { FC } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Code } from "./code";

export const styles = /*#__PURE__*/ css({
  maxWidth: 900,
  marginRight: "auto",
  marginLeft: "auto",
  paddingTop: 16,
  paddingRight: 32,
  paddingBottom: 16,
  paddingLeft: 32,
  fontFamily: "Lato",
  fontSize: 16,
  "& > h1:first-child": {
    marginTop: 0,
  },
  "& hr + h2:not([class])": {
    marginTop: -8,
  },
  "& hr:not([class])": {
    height: 0,
    border: "none",
    borderBottom: "1px solid rgba(var(--light),0.05)",
    marginTop: 24,
    marginBottom: 24,
  },
  "& p:not([class])": {
    lineHeight: 1.5,
  },
  "& a:not([class])": {
    "&:link,&:visited": {
      color: "rgba(var(--light), 0.75)",
    },
    "&:hover,&:focus,&:active": {
      color: "inherit",
    },
  },
  "& code": {
    fontFamily: "'Courier Prime'",
  },
  "& table th, & table td": {
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
  },
  "& table": {
    marginTop: -2,
    marginRight: -8,
    marginBottom: -2,
    marginLeft: -8,
  },
});

const mdxComponents = {
  code: ({ children, ...restProps }: { children: unknown }) => (
    <Code {...restProps}>{typeof children === "string" ? children : ""}</Code>
  ),
};

export const Doc: FC<unknown> = ({ children }) => (
  <MDXProvider components={mdxComponents}>
    <div className={styles}>{children}</div>
  </MDXProvider>
);
