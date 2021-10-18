import { forwardRef } from "react";
import { css } from "demitasse";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";

export const styles = /*#__PURE__*/ css({
  surface: {
    background: "rgba(var(--light), 0.05)",
    borderRadius: 4,
    padding: 16,
    overflow: "auto",
    "& > pre": {
      margin: 0,
    },
  },
  code: {
    fontFamily: "Courier Prime",
    fontSize: 14,
    lineHeight: "20px",
    color: "rgba(var(--light),0.5)",
    "& .token": {
      "&.function": {
        color: "rgba(var(--light),0.7)",
      },
      "&.string,&.number": {
        color: "rgba(var(--light),0.8)",
      },
      "&.punctuation,&.operator,&.keyword": {
        color: "rgba(var(--light),0.3)",
      },
      "&.attr,&.attr-name": {
        color: "rgba(var(--light),0.6)",
      },
      "&.class-name,&.maybe-class-name": {
        color: "rgba(var(--light),0.65)",
      },
    },
  },
});

export const Code = forwardRef<
  HTMLDivElement,
  { children: string; className?: string }
>(function Code({ children: code, className }, ref) {
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
    <div className={styles.surface} ref={ref}>
      <SyntaxHighlighter
        language={lang}
        useInlineStyles={false}
        codeTagProps={{ style: {}, className: styles.code }}
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
    </div>
  );
});
