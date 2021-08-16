import "./index.css";
import hljs from "highlight.js/lib/core";
import hljsBash from "highlight.js/lib/languages/bash";
import hljsTypeScript from "highlight.js/lib/languages/typescript";
import mainContent from "./main.md";
import { runFlare } from "flare";
import { examples } from "./examples";

hljs.registerLanguage("bash", hljsBash);
hljs.registerLanguage("typescript", hljsTypeScript);

const page = document.createElement("div");
page.style.padding = "16px";
if (document.body.firstChild) {
  document.body.insertBefore(page, document.body.firstChild);
} else {
  document.body.appendChild(page);
}

page.innerHTML = mainContent;

const subtitle = document.createElement("h2");
subtitle.textContent = "Examples";
page.appendChild(subtitle);

examples.forEach(({ title, code, flare }, i) => {
  const container = document.createElement("div");
  container.className = "example";
  page.appendChild(container);

  const heading = document.createElement("h3");
  heading.textContent = title;
  container.appendChild(heading);

  const codeWrap = document.createElement("div");
  codeWrap.className = "code-wrap";
  const pre = document.createElement("pre");
  const codeEl = document.createElement("code");
  codeEl.textContent = code
    .split("\n")
    .reduce((str, line, i, lines) => {
      if (line || (str.trim() && lines.find((line, j) => line && j > i))) {
        return str.concat("\n" + line + "  ");
      }
      return str;
    }, "")
    .trim();
  pre.appendChild(codeEl);
  codeWrap.appendChild(pre);
  container.appendChild(codeWrap);

  const controls = document.createElement("div");
  controls.className = "controls";
  controls.id = `controls${i}`;
  container.appendChild(controls);

  const targetWrap = document.createElement("div");
  targetWrap.className = "target-wrap";
  container.appendChild(targetWrap);

  const targetTitle = document.createElement("div");
  targetTitle.className = "target-title";
  targetTitle.innerText = "Result";
  targetWrap.appendChild(targetTitle);

  const target = document.createElement("div");
  target.className = "target";
  target.id = `target${i}`;
  targetWrap.appendChild(target);

  runFlare(controls.id, target.id, flare);
});

hljs.highlightAll();
