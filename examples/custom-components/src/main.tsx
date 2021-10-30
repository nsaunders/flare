import React, { ReactNode, VFC, useState } from "react";
import ReactDOM from "react-dom";
import {
  Components,
  RunFlare,
  ap,
  of,
  map,
  radioGroup,
  resizableList,
  slider,
} from "flare-core";
import { pipe } from "fp-ts/lib/function";
import { Button, ButtonGroup, Slider, Stack, Typography } from "@mui/material";

const colors = ["red", "blue"] as const;

type Color = typeof colors[number];

const Circle: VFC<{ radius: number; color: Color }> = ({ radius, color }) => (
  <div
    style={{
      height: 60,
      display: "flex",
      alignItems: "flex-end",
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: color,
          width: radius * 2,
          height: radius * 2,
          borderRadius: 9999,
        }}
      />
    </div>
  </div>
);

const circlePropsFlare = pipe(
  of((color: Color) => (radius: number) => ({ radius, color })),
  ap(radioGroup({ label: "Color", options: colors, initial: colors[0] })),
  ap(slider({ label: "Radius", initial: 9, max: 18 }))
);

const flare = pipe(
  resizableList({ item: circlePropsFlare, minLength: 1 }),
  map((circlePropsList) =>
    circlePropsList.map((props, key) => <Circle {...{ key, ...props }} />)
  )
);

const components: Partial<Components> = {
  Button: (props) => <Button {...props} variant="contained" size="medium" />,
  RadioGroup: ({ label, options, value, onValueChange }) => (
    <Stack>
      <Typography>{label}</Typography>
      <ButtonGroup variant="outlined" color="secondary">
        {options.map((o) => (
          <Button
            key={o}
            onClick={() => onValueChange(o)}
            variant={o === value ? "contained" : "outlined"}
          >
            {o}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  ),
  ResizableList: ({ addButton, children }) => (
    <Stack alignItems="flex-start" spacing={4}>
      <Stack spacing={1}>{children}</Stack>
      {addButton}
    </Stack>
  ),
  ResizableListItem: ({ children, addButton, removeButton }) => (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {addButton}
      {children}
      {removeButton}
    </Stack>
  ),
  Slider: ({ label, onValueChange, ...props }) => (
    <Stack spacing={0}>
      <Typography>{label}</Typography>
      <div style={{ height: 36, display: "flex", alignItems: "center" }}>
        <Slider
          style={{ width: 150 }}
          onChange={(_, value) =>
            typeof value === "number" && onValueChange(value)
          }
          {...props}
        />
      </div>
    </Stack>
  ),
};

const App: VFC<unknown> = () => {
  const [output, setOutput] = useState<ReactNode>(false);
  return (
    <Stack direction="row" spacing={2}>
      <RunFlare flare={flare} handler={setOutput} components={components} />
      <Stack spacing={1}>{output}</Stack>
    </Stack>
  );
};

const main = (host: Element | null) => {
  if (host) {
    ReactDOM.render(<App />, host);
  }
};

main(document.getElementById("app"));
