import { ChangeEvent, FC, ReactNode, Children, useState } from "react";
import { Flare, RunFlare } from "flare-core";
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

const Button: FC<{
  children?: string;
  disabled?: boolean;
  onClick: () => void;
}> = ({ children: label, ...props }) => (
  <ButtonImpl {...props} motif="tertiary">
    {label || "Button"}
  </ButtonImpl>
);

const NumericInput: FC<{
  children?: undefined;
  label?: string;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  step?: number;
  value: number;
}> = ({ label, onChange, ...restProps }) => (
  <Field label={label}>
    <Input
      type="number"
      onChange={({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          onChange(value);
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

const Select: FC<{
  children?: undefined;
  label?: string;
  options: string[];
  onChange: (selectedIndex: number) => void;
  selectedIndex: number;
}> = ({ label, options, onChange, selectedIndex, ...restProps }) => (
  <Field label={label}>
    <Input
      as="select"
      onChange={({
        currentTarget: { selectedIndex },
      }: ChangeEvent<HTMLSelectElement>) => {
        onChange(selectedIndex);
      }}
      value={options[selectedIndex]}
      {...restProps}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </Input>
  </Field>
);

const Slider: FC<{
  children?: undefined;
  label?: string;
  onChange: (value: number) => void;
  value: number;
}> = ({ label, onChange, ...props }) => (
  <Field label={label}>
    <SliderImpl
      onChange={({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          onChange(value);
        }
      }}
      {...props}
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
                NumericInput,
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
