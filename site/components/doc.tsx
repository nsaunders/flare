import { css } from "demitasse";
import { FC } from "react";

export const styles = /*#__PURE__*/ css({
  paddingTop: 8,
  paddingRight: 16,
  paddingBottom: 8,
  paddingLeft: 16,
  fontFamily: "Lato",
  fontSize: 16,
});

export const Doc: FC<unknown> = ({ children }) => (
  <div className={styles}>{children}</div>
);
