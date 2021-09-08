import {
  ap,
  chain,
  map,
  match,
  of,
  numberInput,
  resizableList,
  select,
  slider,
} from "flare-core";
import { NextPage } from "next";
import { pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { Doc } from "../components/doc";
import { Example } from "../components/example";

type SpecializedShapeProps =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

function makeShape({
  color,
  ...props
}: { color: "red" | "blue" } & SpecializedShapeProps): JSX.Element {
  const wrap = (shape: JSX.Element) => (
    <svg viewBox="0 0 100 100" width="100px" height="100px">
      {shape}
    </svg>
  );
  const fill = color === "red" ? "#f66" : "#09f";
  const stroke = color === "red" ? "#900" : "#009";
  switch (props.type) {
    case "circle":
      return wrap(
        <circle cx="50" cy="50" r={props.radius} fill={fill} stroke={stroke} />,
      );
    case "rectangle":
      return wrap(
        <rect
          x={50 - props.width / 2}
          y={50 - props.height / 2}
          width={props.width}
          height={props.height}
          fill={fill}
          stroke={stroke}
        />,
      );
  }
}

const examples = [
  {
    name: "Basic",
    flare: pipe(
      of(curry2(Math.pow)),
      ap(numberInput({ defaultValue: 2, label: "Base" })),
      ap(numberInput({ defaultValue: 4, label: "Exponent" })),
    ),
    code: `
      pipe(
        of(curry2(Math.pow)),
        ap(numberInput({ defaultValue: 2, label: "Base" })),
        ap(numberInput({ defaultValue: 4, label: "Exponent" })),
      )
    `,
  },
  {
    name: "Adaptive controls",
    flare: pipe(
      of(
        curry2((color: "red" | "blue", props: SpecializedShapeProps) =>
          makeShape({ color, ...props }),
        ),
      ),
      ap(
        select({
          defaultValue: "blue" as const,
          options: ["red", "blue"] as const,
          label: "Color",
        }),
      ),
      ap(
        pipe(
          select({
            defaultValue: "circle" as const,
            options: ["circle", "rectangle"] as const,
            label: "Shape",
          }),
          chain(
            match({
              circle: pipe(
                slider({
                  defaultValue: 25,
                  min: 0,
                  max: 50,
                  label: "Radius",
                }),
                map((radius) => ({ type: "circle" as const, radius })),
              ),
              rectangle: pipe(
                of(
                  curry2((width: number, height: number) => ({
                    type: "rectangle" as const,
                    width,
                    height,
                  })),
                ),
                ap(
                  slider({
                    defaultValue: 50,
                    min: 0,
                    max: 100,
                    label: "Width",
                  }),
                ),
                ap(
                  slider({
                    defaultValue: 25,
                    min: 0,
                    max: 100,
                    label: "Height",
                  }),
                ),
              ),
            }),
          ),
        ),
      ),
    ),
    code: `
      pipe(  
        of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),  
        ap(select({ defaultValue: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),  
        ap(  
          pipe(  
            select({ defaultValue: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),  
            chain(  
              match({  
                circle: pipe(  
                  slider({ defaultValue: 25, min: 0, max: 50, label: "Radius" }),  
                  map(radius => ({ type: "circle" as const, radius }))  
                ),  
                rectangle: pipe(  
                  of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),  
                  ap(slider({ defaultValue: 50, min: 0, max: 100, label: "Width" })),  
                  ap(slider({ defaultValue: 25, min: 0, max: 100, label: "Height" }))  
                )  
              })  
            )  
          )  
        )  
      )
    `,
  },
  {
    name: "Resizable list",
    flare: pipe(
      resizableList({
        item: numberInput({ defaultValue: 1 }),
        defaultItems: [1, 2, 3].map((defaultValue) =>
          numberInput({ defaultValue }),
        ),
        minLength: 1,
      }),
      map(
        (xs: number[]) =>
          `${xs.join(" + ")} = ${xs.reduce((acc, x) => acc + x, 0)}`,
      ),
    ),
    code: `
      pipe(
        resizableList({
          item: numberInput({ defaultValue: 1 }),
          defaultItems: [1, 2, 3].map(defaultValue => numberInput({ defaultValue })),
          minLength: 1
        }),
        map((xs: number[]) => \`\${xs.join(" + ")} = \${xs.reduce((acc, x) => acc + x, 0)}\`)  
      )
    `,
  },
];

const Examples: NextPage = () => (
  <Doc>
    <h1>Examples</h1>
    {examples.map(({ name, flare, code }) => (
      <>
        <h2>{name}</h2>
        <Example flare={flare} code={code} />
      </>
    ))}
  </Doc>
);

export default Examples;
