import { ChangeEvent, FC, ReactNode, Children, useState } from "react";
import { Components, Flare, RunFlare } from "flare-core";
import { css } from "demitasse";
import { Button as ButtonImpl } from "./button";
import { Code } from "./code";
import { Input } from "./input";
import { Slider as SliderImpl } from "./slider";
import { Stack, Item } from "./stack";

export const styles = /*#__PURE__*/ css({
  example: {
    width: "100%",
  },
  field: {
    "& + &": {
      marginTop: 8,
    },
  },
});

const Field: FC<{ label?: string }> = ({ children, label }) => (
  <div className={styles.field}>
    <Stack as="label" direction="column" spacing={2}>
      {label && <Item>{label}</Item>}
      <Item>{children}</Item>
    </Stack>
  </div>
);

const Button: Components["Button"] = ({ children: label, ...props }) => (
  <ButtonImpl {...props} motif="tertiary">
    {label || "Button"}
  </ButtonImpl>
);

const NumberInput: Components["NumberInput"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
  <Field label={label}>
    <Input
      type="number"
      onChange={({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          onValueChange(value);
        }
      }}
      {...restProps}
    />
  </Field>
);

const ResizableList: FC<{ addButton: ReactNode }> = ({
  addButton,
  children,
}) => (
  <Stack direction="column" spacing={2}>
    {Children.map(children, (x) => (
      <Item>{x}</Item>
    ))}
    <Item>{addButton}</Item>
  </Stack>
);

const ResizableListItem: FC<{ addButton: ReactNode; removeButton: ReactNode }> =
  ({ addButton, children, removeButton }) => (
    <Stack direction="row" spacing={2}>
      <Item>{addButton}</Item>
      <Item>{children}</Item>
      <Item>{removeButton}</Item>
    </Stack>
  );

const Select: Components["Select"] = ({
  label,
  onValueChange,
  options,
  value,
}) => (
  <Field label={label}>
    <Input
      as="select"
      onChange={({
        currentTarget: { value },
      }: ChangeEvent<HTMLSelectElement>) => {
        onValueChange(value);
      }}
      value={value}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </Input>
  </Field>
);

const Slider: Components["Slider"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
  <Field label={label}>
    <SliderImpl
      onChange={({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          onValueChange(value);
        }
      }}
      {...restProps}
    />
  </Field>
);

export const Example: FC<{
  children?: undefined;
  code: string;
  flare: Flare<ReactNode>;
}> = ({ code, flare }) => {
  const [output, setOutput] = useState<ReactNode>(null);
  return (
    <Stack direction="column" spacing={16} className={styles.example}>
      <Item>
        <Code>{code}</Code>
      </Item>
      <Item>
        <Stack direction="column" spacing={8}>
          <Item>
            <RunFlare
              flare={flare}
              handler={setOutput}
              components={{
                Button,
                NumberInput,
                ResizableList,
                ResizableListItem,
                Select,
                Slider,
              }}
            />
          </Item>
          <Item>{output}</Item>
        </Stack>
      </Item>
    </Stack>
  );
};
