import { Ref, forwardRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import styled from "styled-components";

const Surface = styled.div`
  background: ${({ theme: { fg } }) => fg(0.05)};
  border-radius: 4px;
  padding: 16px;
  overflow: auto;
  & > pre {
    margin: 0;
  }
`;

const InnerCode = styled.code`
  font-family: "Courier Prime";
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme: { fg } }) => fg(0.5)};
  .token {
    &.function {
      color: ${({ theme: { fg } }) => fg(0.7)};
    }
    &.string,&.number {
      color: ${({ theme: { fg } }) => fg(0.8)};
    }
    &.punctuation,&.operator,&.keyword {
      color: ${({ theme: { fg } }) => fg(0.3)};
    }
    &.attr,&.attr-name {
      color: ${({ theme: { fg } }) => fg(0.6)};
    }
    &.class-name,&.maybe-class-name {
      color: ${({ theme: { fg } }) => fg(0.65)};
    }
  },
`;

const Code = forwardRef<HTMLElement, { children: string; className?: string }>(
  function Code({ children: code, className }, ref) {
    const mindent = code
      .split("\n")
      .filter((line, i, { length }) => line.trim() || (i && i !== length - 1))
      .map((x) => {
        const match = x.match(/^\s+/);
        if (!match) {
          return 0;
        }
        return match[0].length;
      })
      .reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);

    const maybeLang = className && className.replace(/^language\-/, "");
    const lang = ["javascript", "typescript", "jsx"].includes(maybeLang || "")
      ? maybeLang
      : "typescript";

    return (
      <Surface ref={ref as Ref<HTMLDivElement>}>
        <SyntaxHighlighter
          language={lang}
          useInlineStyles={false}
          CodeTag={InnerCode}
          codeTagProps={{ style: {} }}
        >
          {code
            .split("\n")
            .reduce(
              (xs: string[], x: string, i: number, lines: string[]) =>
                x.trim() ||
                (xs.length && lines.slice(i).filter((x) => x.trim()).length)
                  ? xs.concat(x)
                  : xs,
              [],
            )
            .map((x) => x.substring(mindent))
            .join("\n")}
        </SyntaxHighlighter>
      </Surface>
    );
  },
);

Code.displayName = "Code";

export default Code;
