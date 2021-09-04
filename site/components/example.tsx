import { FC, ReactNode, useState } from "react";
import { Flare, RunFlare } from "flare-core";
import { Stack, Item } from "./stack";

export const Example: FC<{ code: string; flare: Flare<ReactNode> }> = ({
  code,
  flare,
}) => {
  const [output, setOutput] = useState<ReactNode>(null);
  return (
    <Stack direction="column" spacing={16}>
      <Item>
        <Stack direction="row" spacing={16}>
          <Item>
            <RunFlare flare={flare} handler={setOutput} />
          </Item>
          <Item>{output}</Item>
        </Stack>
      </Item>
      <Item>{code}</Item>
    </Stack>
  );
};
