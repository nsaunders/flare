import { forwardRef, useEffect, useState } from "react";
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

export const Code = forwardRef<HTMLDivElement, { children: string }>(
  function Code({ children: code }, ref) {
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

    const highlighted = useHighlighter(
      "typescript",
      code
        .split("\n")
        .map((x) => x.substring(mindent))
        .join("\n"),
    );

    const [codeEl, setCodeEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
      if (codeEl && highlighted) {
        codeEl.innerHTML = highlighted.trim();
      }
    }, [codeEl, highlighted]);

    return (
      <div className={styles.surface} ref={ref}>
        <pre className={styles.pre}>
          <code ref={setCodeEl} className={styles.code} />
        </pre>
      </div>
    );
  },
);
