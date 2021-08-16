import * as F from "flare";
import { curry2 } from "fp-ts-std/Function";
import { pipe } from "fp-ts/function";
import { Example } from "./Example";

const title = "Exponentiation";

const code = `
pipe(
  F.of(curry2(Math.pow)),
  F.ap(F.numericInput({ label: "Base", defaultValue: 2 })),
  F.ap(F.numericInput({ label: "Exponent", defaultValue: 10 }))
)
`;

const flare = pipe(
  F.of(curry2(Math.pow)),
  F.ap(F.numericInput({ label: "Base", defaultValue: 2 })),
  F.ap(F.numericInput({ label: "Exponent", defaultValue: 10 })),
  F.map((x) => x.toString()),
);

export const exponentiation: Example = { title, code, flare };
