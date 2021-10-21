import React, { ReactNode, VFC, useState } from "react";
import ReactDOM from "react-dom";
import { RunFlare, ap, of, spinButton } from "flare-core";
import { pipe } from "fp-ts/lib/function";

const flare = pipe(
  of((a: number) => (b: number) => Math.pow(a, b)),
  ap(spinButton({ label: "Base", initial: 2 })),
  ap(spinButton({ label: "Exponent", initial: 4 }))
);

const App: VFC<unknown> = () => {
  const [output, setOutput] = useState<ReactNode>(false);
  return (
    <div>
      <h3>Flare</h3>
      <RunFlare flare={flare} handler={setOutput} />
      <h3>Output</h3>
      {output}
    </div>
  );
};

const main = (host: Element | null) => {
  if (host) {
    ReactDOM.render(<App />, host);
  }
};

main(document.getElementById("app"));
