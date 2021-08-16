import * as F from "flare";
import { pipe } from "fp-ts/function";
import { curry2 } from "fp-ts-std/Function";
import { Example } from "./Example";

type SpecializedShapeProps =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

type ShapeProps = { color: "red" | "blue" } & SpecializedShapeProps;

function makeShape({ color, ...props }: ShapeProps) {
  const wrap = (shape: string) =>
    `<svg viewBox="0 0 100 100" width="100px" height="100px">${shape}</svg>`;
  const fill = color === "red" ? "#f66" : "#09f";
  const stroke = color === "red" ? "#900" : "#009";
  switch (props.type) {
    case "circle":
      return wrap(
        `<circle cx="50" cy="50" r="${props.radius}" fill="${fill}" stroke="${stroke}" />`,
      );
    case "rectangle":
      return wrap(
        `<rect x="${50 - props.width / 2}" y="${
          50 - props.height / 2
        }" width="${props.width}" height="${
          props.height
        }" fill="${fill}" stroke="${stroke}" />`,
      );
  }
}

const title = "Shapes";

const code = `
type SpecializedShapeProps =
  | { type: "circle"; radius: number }
  | { type: "rectangle"; width: number; height: number };

pipe(
  F.of(curry2((color: "red" | "blue", props: SpecializedShapeProps) => makeShape({ color, ...props }))),
  F.ap(F.select({ defaultValue: "blue" as const, options: ["red", "blue"] as const, label: "Color" })),
  F.ap(
    pipe(
      F.select({ defaultValue: "circle" as const, options: ["circle", "rectangle"] as const, label: "Shape" }),
      F.chain(
        F.match({
          circle: pipe(
            F.slider({ defaultValue: 25, min: 0, max: 50, label: "Radius" }),
            F.map(radius => ({ type: "circle" as const, radius }))
          ),
          rectangle: pipe(
            F.of(curry2((width: number, height: number) => ({ type: "rectangle" as const, width, height }))),
            F.ap(F.slider({ defaultValue: 50, min: 0, max: 100, label: "Width" })),
            F.ap(F.slider({ defaultValue: 25, min: 0, max: 100, label: "Height" }))
          )
        })
      )
    )
  )
)
`;

const flare = pipe(
  F.of(
    curry2((color: "red" | "blue", props: SpecializedShapeProps) =>
      makeShape({ color, ...props }),
    ),
  ),
  F.ap(
    F.select({
      defaultValue: "blue" as const,
      options: ["red", "blue"] as const,
      label: "Color",
    }),
  ),
  F.ap(
    pipe(
      F.select({
        defaultValue: "circle" as const,
        options: ["circle", "rectangle"] as const,
        label: "Shape",
      }),
      F.chain(
        F.match({
          circle: pipe(
            F.slider({
              defaultValue: 25,
              min: 0,
              max: 50,
              label: "Radius",
            }),
            F.map((radius) => ({ type: "circle" as const, radius })),
          ),
          rectangle: pipe(
            F.of(
              curry2((width: number, height: number) => ({
                type: "rectangle" as const,
                width,
                height,
              })),
            ),
            F.ap(
              F.slider({
                defaultValue: 50,
                min: 0,
                max: 100,
                label: "Width",
              }),
            ),
            F.ap(
              F.slider({
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
);

export const shapes: Example = { title, code, flare };
