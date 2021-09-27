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
  comboBox,
  radioGroup,
  slider,
  switch_,
  spinButton,
  textBox,
  resizableList,
} from "flare-core";

/**
 * Runs the specified Flare, invoking the handler on each change.
 *
 * @typeParam A - The value produced by the Flare
 *
 * @param controlsElementId - The id of the element in which to render the Flare
 * controls
 * @param handler - The callback function to invoke each time the value changes
 * @param flare - The Flare to run
 */
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

/**
 * An HTML string
 * @ignore
 */
export type HTML = string;

/**
 * Runs the specified Flare, rendering its HTML output to the target element.
 *
 * @param controlsElementId - The id of the element in which to render the Flare
 * controls
 * @param targetElementId - The id of the element in which to render the HTML
 * output
 * @param flare - The Flare to run
 */
export function runFlare(
  controlsElementId: string,
  targetElementId: string,
  flare: Flare<HTML>,
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
