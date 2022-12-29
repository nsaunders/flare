import type * as F from "flare-core";
import {
  ChangeEvent,
  ReactNode,
  Children,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ComponentProps,
} from "react";
import { Flare, RunFlare } from "flare-core";
import ButtonImpl from "./Button";
import Code from "./Code";
import Input from "./Input";
import SliderImpl from "./Slider";
import CloseIcon from "./CloseIcon";
import EditIcon from "./EditIcon";
import SyncIcon from "./SyncIcon";
import styled, { keyframes } from "styled-components";
import pkg from "../../package.json";

const { version } = pkg;

const spinAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const EditButton = styled.button<{ spin: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  animation-name: ${spinAnimation};
  animation-duration: 1s;
  animation-iteration-count: ${({ spin }) => (spin ? "infinite" : 0)};
  animation-timing-function: linear;
`;

const FieldLayout = styled.label`
  & ~ & {
    margin-top: 8px;
  }

  display: inline-flex;
  flex-direction: column;
  gap: 1px;
`;

function Field({ children, label }: { label?: string; children: ReactNode }) {
  return (
    <FieldLayout>
      {label && <div>{label}</div>}
      <div>{children}</div>
    </FieldLayout>
  );
}

function Button({ children: label, ...props }: ComponentProps<F.Button>) {
  return (
    <ButtonImpl {...props} motif="tertiary">
      {label || "Button"}
    </ButtonImpl>
  );
}

const ResizableListLayout = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1px;
`;

function ResizableList({
  addButton,
  children,
}: ComponentProps<F.ResizableList>) {
  return (
    <ResizableListLayout>
      {Children.map(children, (x) => (
        <div>{x}</div>
      ))}
      <div>{addButton}</div>
    </ResizableListLayout>
  );
}

const ResizableListItemLayout = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 1px;
`;

function ResizableListItem({
  addButton,
  children,
  removeButton,
}: ComponentProps<F.ResizableListItem>) {
  return (
    <ResizableListItemLayout>
      <div>{addButton}</div>
      <div>{children}</div>
      <div>{removeButton}</div>
    </ResizableListItemLayout>
  );
}

function ComboBox({
  label,
  onValueChange,
  options,
  value,
}: ComponentProps<F.ComboBox>) {
  return (
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
}

function Slider({
  label,
  onValueChange,
  ...restProps
}: ComponentProps<F.Slider>) {
  return (
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
}

function SpinButton({
  label,
  onValueChange,
  ...restProps
}: ComponentProps<F.SpinButton>) {
  return (
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
}

const ExampleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ExampleSandbox = styled.iframe<{ error?: boolean }>`
  position: absolute;
  border: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ error, theme: { fg } }) =>
    error &&
    `
    background: ${fg(0.05)};
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

export default function Example({
  title,
  displayCode,
  sandboxCode,
  flare,
}: {
  title: string;
  displayCode: string;
  sandboxCode?: Parameters<typeof createSandbox>[0];
  flare: Flare<ReactNode>;
}) {
  const [output, setOutput] = useState<ReactNode>(null);
  const [sandboxStatus, setSandboxStatus] = useState<
    | { tag: "none" }
    | { tag: "creating" }
    | { tag: "error" }
    | { tag: "created"; id: string }
  >({ tag: "none" });
  const [setContainer, { height }] = useMeasure();

  let Icon: typeof EditIcon;
  switch (sandboxStatus.tag) {
    case "none":
      Icon = EditIcon;
      break;
    case "creating":
      Icon = SyncIcon;
      break;
    default:
      Icon = CloseIcon;
      break;
  }

  return (
    <>
      <ExampleHeader>
        <h2>{title}</h2>
        {sandboxCode && (
          <EditButton
            spin={sandboxStatus.tag === "creating"}
            as={ButtonImpl}
            icon={Icon}
            motif="tertiary"
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
        )}
      </ExampleHeader>
      <div style={{ position: "relative", width: "100%", height }}>
        {sandboxStatus.tag === "created" && (
          <ExampleSandbox
            src={`https://codesandbox.io/embed/${sandboxStatus.id}?module=/src/main.ts`}
          />
        )}
        {sandboxStatus.tag === "error" && (
          <ExampleSandbox as="div" error>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div>An error occurred while creating the sandbox.</div>
              <div style={{ display: "flex", gap: 4 }}>
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
                <ButtonImpl
                  motif="tertiary"
                  onClick={() => {
                    setSandboxStatus({ tag: "none" });
                  }}
                >
                  Cancel
                </ButtonImpl>
              </div>
            </div>
          </ExampleSandbox>
        )}
        {(sandboxStatus.tag === "none" || sandboxStatus.tag === "creating") && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
            ref={(el: HTMLDivElement) => {
              setContainer(el);
            }}
          >
            <Code>{displayCode}</Code>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
              <div>{output}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

async function createSandbox(content: string): Promise<string> {
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

  const res = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/define?json=1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    },
  );

  const { sandbox_id } = await res.json();

  return sandbox_id;
}

function useMeasure(): [
  (el: Element) => void,
  Pick<DOMRect, "width" | "height">,
] {
  const [el, setEl] = useState<Element | null>(null);
  const [rect, setRect] = useState<Pick<DOMRect, "width" | "height">>({
    width: 0,
    height: 0,
  });

  const update = useCallback(() => {
    el && setRect(el.getBoundingClientRect());
  }, [el]);

  const resizeObserver = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return new ResizeObserver(update);
  }, [typeof window, update]);

  useEffect(() => {
    if (resizeObserver && el) {
      resizeObserver.observe(el);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [resizeObserver, el]);

  return [setEl, rect];
}
