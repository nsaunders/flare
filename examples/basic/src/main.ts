import { flow, pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { ap, of, runFlare, spinButton } from "flare";

const flare = pipe(
  pipe(
    of(curry2(flow(Math.pow, x => x.toString()))),
    ap(spinButton({ label: "Base", initial: 2 })),
    ap(spinButton({ label: "Exponent", initial: 4 })),
  ),
);

runFlare("controls", "output", flare);
