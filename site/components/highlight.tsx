import {
  FC,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import hljsLib from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { HLJSApi } from "highlight.js";

const availableLanguages = { typescript };
type Language = keyof typeof availableLanguages;

function reducer(
  [hljs, registered]: [HLJSApi, Language[]],
  language: Language,
): [HLJSApi, Language[]] {
  console.log("registering language " + language);
  if (!registered.includes(language)) {
    hljs.registerLanguage(language, availableLanguages[language]);
    return [hljs, registered.concat(language)];
  }
  return [hljs, registered];
}

const HighlightContext = createContext<[HLJSApi, (language: Language) => void]>(
  [
    hljsLib,
    () => {
      /*noop*/
    },
  ],
);

export const Highlighter: FC<unknown> = ({ children }) => {
  const [[hljs], register] = useReducer(reducer, [hljsLib, []]);
  return (
    <HighlightContext.Provider value={[hljs, register]}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlighter = (language: Language, code: string): string => {
  const [hljs, register] = useContext(HighlightContext);
  const [highlighted, setHighlighted] = useState(code);
  useEffect(() => {
    register(language);
    setHighlighted(hljs.highlight(code, { language }).value);
  }, [language, code]);
  return highlighted;
};
