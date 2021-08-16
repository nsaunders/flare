import * as F from "flare";
import { pipe } from "fp-ts/function";
import { curry2 } from "fp-ts-std/Function";
import { Example } from "./Example";

function makeButton(props: { label: string } & SpecializedButtonProps) {
  const extraStyle = props.block
    ? `width:100%;text-align:${props.alignment};`
    : "";

  return `<button style="${extraStyle}">${props.label}</button>`;
}

const title = "Complex component props";

const code = `
type SpecializedButtonProps =
  | { block: true; alignment: "left" | "center" | "right" }
  | { block: false; alignment?: undefined };

pipe(
  F.of(curry2((label: string, props: SpecializedButtonProps) => makeButton({ label, ...props }))),
  F.ap(F.textInput({ defaultValue: "Button", nonEmpty: true, label: "Label" })),
  F.ap(
    pipe(
      F.checkbox({ defaultValue: false, label: "Block" }),
      F.chain(
        F.ifElse(
          pipe(
            F.select({ defaultValue: "center" as const, options: ["left", "center", "right"] as const, label: "Alignment" }),
            F.map(alignment => ({ block: true as const, alignment }))
          ),
          F.of({ block: false as const })
        )
      )
    )
  )
)
`;

type SpecializedButtonProps =
  | {
      block: true;
      alignment: "left" | "center" | "right";
    }
  | {
      block: false;
      alignment?: undefined;
    };

const flare = pipe(
  F.of(
    curry2((label: string, props: SpecializedButtonProps) =>
      makeButton({ label, ...props }),
    ),
  ),
  F.ap(F.textInput({ defaultValue: "Button", nonEmpty: true, label: "Label" })),
  F.ap(
    pipe(
      F.checkbox({ defaultValue: false, label: "Block" }),
      F.chain(
        F.ifElse(
          pipe(
            F.select({
              defaultValue: "center" as const,
              options: ["left", "center", "right"] as const,
              label: "Alignment",
            }),
            F.map((alignment) => ({ block: true as const, alignment })),
          ),
          F.of({ block: false as const }),
        ),
      ),
    ),
  ),
);

export const componentProps: Example = { title, code, flare };
