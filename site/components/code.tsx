import { FC } from "react";
import { css } from "demitasse";
import { useHighlighter } from "./highlight";

export const styles = /*#__PURE__*/ css({
  surface: {
    background: "rgba(var(--light), 0.05)",
    borderRadius: 4,
    padding: 16,
    overflow: "auto",
  },
  pre: {
    margin: 0,
  },
  code: {
    fontFamily: "Courier Prime",
    fontSize: 14,
    lineHeight: "20px",
    color: "rgba(var(--light), 0.5)",
    "& .hljs-": {
      "&title.function_, &title.class_, &number, &string": {
        color: "rgba(var(--light), 0.9)",
      },
      "&property, &attr": {
        color: "rgba(var(--light), 0.7)",
      },
    },
  },
});

export const Code: FC<{ children: string }> = ({ children: code }) => {
  const mindent = code
    .split("\n")
    .filter((line, i, { length }) => line.trim() || (i && i !== length - 1))
    .map((x) => {
      const match = x.match(/^\s+/);
      if (!match) {
        return Number.MAX_VALUE;
      }
      return match[0].length;
    })
    .reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);
  const highlighted = useHighlighter(
    "typescript",
    code
      .split("\n")
      .map((x) => x.substring(mindent))
      .join("\n"),
  );
  return (
    <div className={styles.surface}>
      <pre className={styles.pre}>
        <code
          dangerouslySetInnerHTML={{ __html: highlighted.trim() }}
          className={styles.code}
        />
      </pre>
    </div>
  );
};
