import { ap, of, numericInput } from "flare-core";
import { NextPage } from "next";
import { pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { Doc } from "../components/doc";
import { Example } from "../components/example";

const exponentiation = pipe(
  of(curry2(Math.pow)),
  ap(numericInput({ defaultValue: 2, label: "Base" })),
  ap(numericInput({ defaultValue: 4, label: "Exponent" })),
);

const Examples: NextPage = () => (
  <Doc>
    <Example flare={exponentiation} code="insert crappy code here" />
  </Doc>
);

export default Examples;
