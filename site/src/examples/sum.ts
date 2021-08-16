import * as F from "flare";
import { pipe } from "fp-ts/function";
import { Example } from "./Example";

const title = "Sum (resizable list)";

const code = `
pipe(
  F.resizableList({ item: F.numericInput({ defaultValue: 1 }), defaultItems: [1, 2, 3].map(defaultValue => F.numericInput({ defaultValue })), minLength: 1 }),
  F.map((xs: number[]) => \`$\{xs.join(" + ")} = $\{xs.reduce((acc, x) => acc + x, 0)}\`)
)
`;

const flare = pipe(
  F.resizableList({
    item: F.numericInput({ defaultValue: 1 }),
    defaultItems: [1, 2, 3].map((defaultValue) =>
      F.numericInput({ defaultValue }),
    ),
    minLength: 1,
  }),
  F.map(
    (xs: number[]) =>
      `${xs.join(" + ")} = ${xs.reduce((acc, x) => acc + x, 0)}`,
  ),
);

export const sum: Example = { title, code, flare };
