import { FC } from "react";
import { css } from "demitasse";
import { Logo } from "./logo";
import {Space} from "./space";
import {Stack, Item} from "./stack";

export const styles = /*#__PURE__*/ css({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
});

export const Doc: FC<unknown> = ({ children }) => (
  <Stack direction="column" block>
    <Item className={styles.header}>
      <Logo />
    </Item>
    <Item>
      {children}
    </Item>
  </Stack>
);
