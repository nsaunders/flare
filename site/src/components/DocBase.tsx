import { ComponentProps, ReactNode, Ref } from "react";
import { MDXProvider } from "@mdx-js/react";
import Code from "./Code";
import styled from "styled-components";

const ContentWrap = styled.div`
  max-width: 900px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 16px;
  padding-right: 32px;
  padding-bottom: 16px;
  padding-left: 32px;
  font-family: "Lato";
  font-size: 16px;
  & > h1:first-child {
    margin-top: 0;
  }
  & hr + h2:not([class]) {
    margin-top: -8px;
  }
  & hr:not([class]) {
    height: 0;
    border: none;
    border-bottom: 1px solid ${({ theme: { fg } }) => fg(0.05)};
    margin-top: 24px;
    margin-bottom: 24px;
  }
  & p:not([class]) {
    line-height: 1.5;
  }
  & a:not([class]) {
    &:link,
    &:visited {
      color: ${({ theme: { fg } }) => fg(0.75)};
    }
    &:hover,
    &:focus,
    &:active {
      color: inherit;
    }
  }
  & code {
    font-family: "Courier Prime";
  }
  & table th,
  & table td {
    text-align: start;
    padding-top: 2px;
    padding-right: 8px;
    padding-bottom: 2px;
    padding-left: 8px;
  }
  & table {
    margin-top: -2px;
    margin-right: -8px;
    margin-bottom: -2px;
    margin-left: -8px;
  }
`;

const mdxComponents: Exclude<
  ComponentProps<typeof MDXProvider>["components"],
  undefined
> = {
  code({ children, ref, ...restProps }) {
    if (typeof children === "string" && children.includes("\n")) {
      return (
        <Code ref={ref as Ref<HTMLDivElement>} {...restProps}>
          {children}
        </Code>
      );
    }
    return (
      <code ref={ref} {...restProps}>
        {children}
      </code>
    );
  },
};

export default function Doc({ children }: { children?: ReactNode }) {
  return (
    <MDXProvider components={mdxComponents}>
      <ContentWrap>{children}</ContentWrap>
    </MDXProvider>
  );
}
