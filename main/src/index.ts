import React from "react";
import ReactDOM from "react-dom";
import { Flare, RunFlare } from "flare-core";
export {
  Flare,
  Unflare,
  ap,
  chain,
  map,
  of,
  ifElse,
  match,
  checkbox,
  radioGroup,
  select,
  slider,
  switch_,
  spinButton,
  textbox,
  resizableList,
} from "flare-core";

export function runFlareWith<A>(
  controlsElementId: string,
  handler: (a: A) => void,

  flare: Flare<A>,
): void {
  const controlsElement = document.getElementById(controlsElementId);
  if (!controlsElement) {
    throw new Error(`Could not locate element with ID "${controlsElementId}".`);
  }
  ReactDOM.render(
    React.createElement(RunFlare, {
      flare,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: (a: any) => {
        handler(a);
      },
    }),
    controlsElement,
  );
}

export function runFlare(
  controlsElementId: string,
  targetElementId: string,
  flare: Flare<string>,
): void {
  const targetElement = document.getElementById(targetElementId);
  if (!targetElement) {
    throw new Error(`Could not locate element with ID "${targetElementId}".`);
  }
  runFlareWith(
    controlsElementId,
    (output: string) => {
      targetElement.innerHTML = output;
    },
    flare,
  );
}
