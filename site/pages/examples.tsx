import {
  ap,
  chain,
  comboBox,
  map,
  match,
  of,
  resizableList,
  slider,
  spinButton,
} from "flare-core";
import { NextPage } from "next";
import { pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { Doc } from "../components/doc";
import { Example } from "../components/example";
import { SmartHead } from "../components/smart-head";

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
    title: "Basic",
    flare: pipe(
      of(curry2(Math.pow)),
      ap(spinButton({ initial: 2, label: "Base" })),
      ap(spinButton({ initial: 4, label: "Exponent" })),
    ),
    displayCode: `
      pipe(
        of(curry2(Math.pow)),
        ap(spinButton({ initial: 2, label: "Base" })),
        ap(spinButton({ initial: 4, label: "Exponent" }))
      )
    `,
    sandboxCode: `import { pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { ap, map, of, spinButton, runFlare } from "flare";

const flare = pipe(
  of(curry2(Math.pow)),
  ap(spinButton({ initial: 2, label: "Base" })),
  ap(spinButton({ initial: 4, label: "Exponent" }))
);

runFlare("controls", "output", pipe(flare, map(x => x.toLocaleString())));`,
  },
  {
    title: "Adaptive controls",
    flare: pipe(
      of(
        curry2((color: "red" | "blue", props: SpecializedShapeProps) =>
          makeShape({ color, ...props }),
        ),
      ),
      ap(
        comboBox({
          initial: "blue" as const,
          options: ["red", "blue"] as const,
          label: "Color",
        }),
      ),
      ap(
        pipe(
          comboBox({
            initial: "circle" as const,
            options: ["circle", "rectangle"] as const,
            label: "Shape",
          }),
          chain(
            match({
              circle: pipe(
                slider({
                  initial: 25,
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
                    initial: 50,
                    min: 0,
                    max: 100,
                    label: "Width",
                  }),
                ),
                ap(
                  slider({
                    initial: 25,
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
    displayCode: `
      pipe(
        of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),
        ap(comboBox({ initial: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),
        ap(
          pipe(
            comboBox({ initial: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),
            chain(
              match({
                circle: pipe(
                  slider({ initial: 25, min: 0, max: 50, label: "Radius" }),
                  map(radius => ({ type: "circle" as const, radius }))
                ),
                rectangle: pipe(
                  of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),
                  ap(slider({ initial: 50, min: 0, max: 100, label: "Width" })),
                  ap(slider({ initial: 25, min: 0, max: 100, label: "Height" }))
                )
              })
            )
          )
        )
      )
    `,
    sandboxCode: `import { pipe } from "fp-ts/lib/function";
import { curry2 } from "fp-ts-std/Function";
import { ap, chain, map, match, of, comboBox, slider, runFlare } from "flare";

type SpecializedShapeProps =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

const flare = pipe(
  of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),
  ap(comboBox({ initial: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),
  ap(
    pipe(
      comboBox({ initial: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),
      chain(
        match({
          circle: pipe(
            slider({ initial: 25, min: 0, max: 50, label: "Radius" }),
            map(radius => ({ type: "circle" as const, radius }))
          ),
          rectangle: pipe(
            of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),
            ap(slider({ initial: 50, min: 0, max: 100, label: "Width" })),
            ap(slider({ initial: 25, min: 0, max: 100, label: "Height" }))
          )
        })
      )
    )
  )
);

runFlare("controls", "output", flare);

function makeShape({ color, ...props }: { color: "red" | "blue" } & SpecializedShapeProps): string {
  const wrap = (shape: string) => \`
    <svg viewBox="0 0 100 100" width="100px" height="100px">
      \${shape}
    </svg>
  \`;
  const fill = color === "red" ? "#f66" : "#09f";
  const stroke = color === "red" ? "#900" : "#009";
  switch (props.type) {
    case "circle":
      return wrap(
        \`<circle cx="50" cy="50" r=\${props.radius} fill=\${fill} stroke=\${stroke} />\`,
      );
    case "rectangle":
      return wrap(\`
        <rect
          x=\${50 - props.width / 2}
          y=\${50 - props.height / 2}
          width=\${props.width}
          height=\${props.height}
          fill=\${fill}
          stroke=\${stroke}
        />
      \`);
  }
}`,
  },
  {
    title: "Resizable list",
    flare: pipe(
      resizableList({
        item: spinButton({ initial: 1 }),
        initial: [1, 2, 3].map((initial) => spinButton({ initial })),
        minLength: 1,
      }),
      map(
        (xs: number[]) =>
          `${xs.join(" + ")} = ${xs.reduce((acc, x) => acc + x, 0)}`,
      ),
    ),
    displayCode: `
      pipe(
        resizableList({
          item: spinButton({ initial: 1 }),
          initial: [1, 2, 3].map(initial => spinButton({ initial })),
          minLength: 1
        }),
        map((xs: number[]) => \`\${xs.join(" + ")} = \${xs.reduce((acc, x) => acc + x, 0)}\`)  
      )
    `,
    sandboxCode: `import { pipe } from "fp-ts/lib/function";
import { map, resizableList, runFlare, spinButton } from "flare";

const flare = pipe(
  resizableList({
    item: spinButton({ initial: 1 }),
    initial: [1, 2, 3].map(initial => spinButton({ initial })),
    minLength: 1
  }),
  map((xs: number[]) => \`\${xs.join(" + ")} = \${xs.reduce((acc, x) => acc + x, 0)}\`)  
);

runFlare("controls", "output", flare);`,
  },
] as const;

const Examples: NextPage = () => (
  <>
    <SmartHead
      title="Examples"
      description="See how Flare leverages applicative programming in TypeScript to build UIs with minimal code."
    />
    <Doc>
      <h1 style={{ marginBottom: 0 }}>Examples</h1>
      {examples.map((props, i) => (
        <Example key={i} {...props} />
      ))}
    </Doc>
  </>
);

export default Examples;
