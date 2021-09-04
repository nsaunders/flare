import { FC, ReactNode, useState } from "react";
import { Flare, RunFlare } from "flare-core";
import { css } from "demitasse";
import { Code } from "./code";
import { Stack, Item } from "./stack";

export const styles = /*#__PURE__*/ css({
  width: "100%",
});

export const Example: FC<{
  children?: undefined;
  code: string;
  flare: Flare<ReactNode>;
}> = ({ code, flare }) => {
  const [output, setOutput] = useState<ReactNode>(null);
  return (
    <Stack direction="column" spacing={16} className={styles}>
      <Item>
        <Code>{code}</Code>
      </Item>
      <Item>
        <Stack direction="column" spacing={8}>
          <Item>
            <RunFlare flare={flare} handler={setOutput} />
          </Item>
          <Item>{output}</Item>
        </Stack>
      </Item>
    </Stack>
  );
};
