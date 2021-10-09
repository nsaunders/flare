import { FC } from "react";
import { css } from "demitasse";
import cx from "clsx";
import { Logo } from "./logo";
import { ModeToggle } from "./mode";

export const styles = /*#__PURE__*/ css({
  container: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: 78,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    transitionProperty: "height",
    transitionDuration: "250ms",
  },
  containerExpanded: {
    height: "calc(50vh - 31px)",
  },
  logo: {
    position: "absolute",
    bottom: 0,
  },
  mode: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export const Header: FC<{ children?: undefined; expanded?: boolean }> = ({
  expanded,
}) => (
  <header
    className={cx(styles.container, expanded && styles.containerExpanded)}
  >
    <Logo className={styles.logo} />
    <div className={styles.mode}>
      <ModeToggle />
    </div>
  </header>
);
