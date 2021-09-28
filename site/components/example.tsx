import { ChangeEvent, FC, ReactNode, Children, useState } from "react";
import type * as F from "flare-core";
import { Flare, RunFlare } from "flare-core";
import { css } from "demitasse";
import cx from "clsx";
import { useMeasure } from "react-use";
import { Button as ButtonImpl } from "./button";
import { Code } from "./code";
import { Input } from "./input";
import { Slider as SliderImpl } from "./slider";
import { Stack, Item } from "./stack";
import { Close, Edit, Sync } from "@material-ui/icons";
import pkg from "../package.json";

const { version } = pkg;

export const styles = /*#__PURE__*/ css({
  example: {
    width: "100%",
  },
  field: {
    "& + &": {
      marginTop: 8,
    },
  },
  content: {
    position: "relative",
    width: "100%",
  },
  sandbox: {
    position: "absolute",
    border: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  sandboxError: {
    background: "rgba(var(--light), 0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 9999,
  },
  editButtonSpin: {
    animationKeyframes: {
      "0%": {
        transform: "rotate(0)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
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

const Button: F.Button = ({ children: label, ...props }) => (
  <ButtonImpl {...props} motif="tertiary">
    {label || "Button"}
  </ButtonImpl>
);

const ResizableList: F.ResizableList = ({ addButton, children }) => (
  <Stack direction="column" spacing={2}>
    {Children.map(children, (x) => (
      <Item>{x}</Item>
    ))}
    <Item>{addButton}</Item>
  </Stack>
);

const ResizableListItem: F.ResizableListItem = ({
  addButton,
  children,
  removeButton,
}) => (
  <Stack direction="row" spacing={2}>
    <Item>{addButton}</Item>
    <Item>{children}</Item>
    <Item>{removeButton}</Item>
  </Stack>
);

const ComboBox: F.ComboBox = ({ label, onValueChange, options, value }) => (
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

const Slider: F.Slider = ({ label, onValueChange, ...restProps }) => (
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

const SpinButton: F.SpinButton = ({ label, onValueChange, ...restProps }) => (
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

export const Example: FC<{
  children?: undefined;
  title: string;
  displayCode: string;
  sandboxCode?: Parameters<typeof createSandbox>[0];
  flare: Flare<ReactNode>;
}> = ({ title, displayCode, sandboxCode, flare }) => {
  const [output, setOutput] = useState<ReactNode>(null);
  const [sandboxStatus, setSandboxStatus] = useState<
    | { tag: "none" }
    | { tag: "creating" }
    | { tag: "error" }
    | { tag: "created"; id: string }
  >({ tag: "none" });
  const [setContainer, { height }] = useMeasure();

  let Icon: typeof Edit;
  switch (sandboxStatus.tag) {
    case "none":
      Icon = Edit;
      break;
    case "creating":
      Icon = Sync;
      break;
    default:
      Icon = Close;
      break;
  }

  return (
    <>
      <Stack alignItems="center" block justifyContent="space-between">
        <Item>
          <h2>{title}</h2>
        </Item>
        {sandboxCode && (
          <Item>
            <ButtonImpl
              icon={Icon}
              motif="tertiary"
              className={cx(
                styles.editButton,
                sandboxStatus.tag === "creating" && styles.editButtonSpin,
              )}
              onClick={() => {
                if (sandboxStatus.tag === "created") {
                  setSandboxStatus({ tag: "none" });
                } else {
                  setSandboxStatus({ tag: "creating" });
                  createSandbox(sandboxCode)
                    .then((id) => {
                      setSandboxStatus({ tag: "created", id });
                    })
                    .catch(() => {
                      setSandboxStatus({ tag: "error" });
                    });
                }
              }}
            />
          </Item>
        )}
      </Stack>
      <div className={styles.content} style={{ height }}>
        {sandboxStatus.tag === "created" && (
          <iframe
            className={styles.sandbox}
            src={`https://codesandbox.io/embed/${sandboxStatus.id}`}
          />
        )}
        {sandboxStatus.tag === "error" && (
          <div className={cx(styles.sandbox, styles.sandboxError)}>
            <Stack spacing={48} direction="column" alignItems="center">
              <Item>An error occurred while creating the sandbox.</Item>
              <Item>
                <Stack direction="row" spacing={8}>
                  <Item>
                    <ButtonImpl
                      motif="primary"
                      onClick={() => {
                        if (sandboxCode) {
                          setSandboxStatus({ tag: "creating" });
                          createSandbox(sandboxCode)
                            .then((id) => {
                              setSandboxStatus({ tag: "created", id });
                            })
                            .catch(() => {
                              setSandboxStatus({ tag: "error" });
                            });
                        } else {
                          setSandboxStatus({ tag: "none" });
                        }
                      }}
                    >
                      Retry
                    </ButtonImpl>
                  </Item>
                  <Item>
                    <ButtonImpl
                      motif="tertiary"
                      onClick={() => {
                        setSandboxStatus({ tag: "none" });
                      }}
                    >
                      Cancel
                    </ButtonImpl>
                  </Item>
                </Stack>
              </Item>
            </Stack>
          </div>
        )}
        {(sandboxStatus.tag === "none" || sandboxStatus.tag === "creating") && (
          <Stack
            direction="column"
            spacing={16}
            className={styles.example}
            ref={(el: HTMLDivElement) => {
              setContainer(el);
            }}
          >
            <Item>
              <Code>{displayCode}</Code>
            </Item>
            <Item>
              <Stack direction="column" spacing={8}>
                <Item>
                  <RunFlare
                    flare={flare}
                    handler={setOutput}
                    components={{
                      Button,
                      ComboBox,
                      SpinButton,
                      ResizableList,
                      ResizableListItem,
                      Slider,
                    }}
                  />
                </Item>
                <Item>{output}</Item>
              </Stack>
            </Item>
          </Stack>
        )}
      </div>
    </>
  );
};

function createSandbox(content: string): Promise<string> {
  const pkg = {
    content: {
      scripts: {
        start: "parcel index.html --open",
      },
      dependencies: {
        "@tsconfig/recommended": "^1.0.1",
        flare: `^${version}`,
        "fp-ts": "^2.11.2",
        "fp-ts-std": "^0.11.0",
        parcel: "^2.0.0-rc.0",
      },
    },
  };

  const index = {
    content: `<!DOCTYPE html>
<html>
  <head>
    <title>Flare Demo</title>
    <link rel="stylesheet" href="node_modules/flare/css/flare.css">
  </head>
  <body>
    <div id="controls"></div>
    <div id="output" style="margin-top: 8px;"></div>
    <script src="./src/main.ts" type="module"></script>
  </body>
</html>`,
  };

  const main = {
    content,
  };

  const tsconfig = {
    content: {
      extends: "@tsconfig/recommended",
      rootDir: "src",
    },
  };

  const body = JSON.stringify({
    files: {
      "package.json": pkg,
      "index.html": index,
      "src/main.ts": main,
      "tsconfig.json": tsconfig,
    },
  });

  return fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then(({ sandbox_id }) => sandbox_id);
}
