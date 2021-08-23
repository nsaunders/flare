import {ElementType, ReactElement, forwardRef} from "react";
import { PolymorphicComponentProps, Box } from "react-polymorphic-box";
import cx from "clsx";
import {css} from "demitasse";

export const styles = css({
  base: {
    appearance: "none",
    outline: "none",
    textDecoration: "none",
    display: "inline-block",
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 4,
    fontFamily: "Lato",
    lineHeight: 1,
    background: "#000",
    color: "#fff",
    paddingTop: 0,
    paddingBottom: 0,
    "&:focus,&:active": {
      boxShadow: "0 0 0.166em 0.083em rgba(255,255,255,0.5)",
    },
  },
  medium: {
    fontSize: 12,
    paddingRight: 7,
    paddingLeft: 7,
  },
  mediumText: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  large: {
    fontSize: 16,
    paddingRight: 11,
    paddingLeft: 11,
  },
  largeText: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  basic: {
    background: "#000",
    color: "#fff",
    "&:active": {
      background: "#fff",
      color: "#000",
    }
  },
  primary: {
    background: "#fff",
    color: "#000",
    "&:active": {
      background: "#000",
      color: "#fff",
    },
  },
  grow: {
    transitionProperty: "transform",
    transitionDuration: "250ms",
    "&:focus,&:hover": {
      transform: "scale(1.05)",
    },
  },
});

type ButtonOwnProps = {
  grow?: boolean;
  motif?: "primary" | "basic";
  size?: "medium" | "large";
};

const defaultElement = "button";

type ButtonProps<E extends ElementType = typeof defaultElement> = PolymorphicComponentProps<E, ButtonOwnProps>;

export const Button: <E extends ElementType = typeof defaultElement>(props: ButtonProps<E>) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof defaultElement>({ className, children, grow, motif = "basic", size = "medium", ...restProps }: ButtonProps<E>, ref: typeof restProps.ref) => (
    <Box
      as={defaultElement}
      className={cx(className, styles.base, {
        [styles.grow]: grow,
        [styles.basic]: motif === "basic",
        [styles.primary]: motif === "primary",
        [styles.medium]: size === "medium",
        [styles.large]: size === "large",
      })}
      {...restProps}
      ref={ref}>
      <div className={cx({
        [styles.mediumText]: size === "medium",
        [styles.largeText]: size === "large",
      })}>{children}</div>
    </Box>
  ),
);
