import { FC, createContext, useContext, useEffect, useState } from "react";
import hljsLib from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import { HLJSApi } from "highlight.js";

const availableLanguages = { xml, javascript, typescript };
Object.entries(availableLanguages).forEach(([k, v]) =>
  hljsLib.registerLanguage(k, v),
);

type Language = keyof typeof availableLanguages;

const HighlightContext = createContext<HLJSApi>(hljsLib);

export const Highlighter: FC<unknown> = ({ children }) => {
  return (
    <HighlightContext.Provider value={hljsLib}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlighter = (language: Language, code: string): string => {
  const hljs = useContext(HighlightContext);
  const [highlighted, setHighlighted] = useState(code);
  useEffect(() => {
    setHighlighted(hljs.highlight(code, { language }).value);
  }, [code, hljs, language]);
  return highlighted;
};
