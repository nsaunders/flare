import { ElementType, ReactElement, forwardRef, FC } from "react";
import { PolymorphicComponentProps, Box } from "react-polymorphic-box";
import cx from "clsx";
import { css } from "demitasse";

const border = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgb(var(--light))",
} as const;

const focusShadow = {
  "&:focus,&:active": {
    boxShadow: "0 0 0.166em 0.083em rgba(var(--light),0.5)",
  },
} as const;

export const styles = /*#__PURE__*/ css({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    appearance: "none",
    outline: "none",
    textDecoration: "none",
    margin: 0,
    borderRadius: 4,
    fontFamily: "Lato",
    lineHeight: 1,
    background: "var(rgb(--dark))",
    color: "var(rgb(--light))",
    paddingTop: 0,
    paddingBottom: 0,
  },
  icon: {
    display: "inline-flex",
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
  mediumIcon: {
    paddingTop: 1,
    paddingBottom: 1,
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
  largeIcon: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  basic: {
    ...border,
    ...focusShadow,
    background: "rgb(var(--dark))",
    color: "rgb(var(--light))",
    "&:active": {
      background: "rgb(var(--light))",
      color: "rgb(var(--dark))",
    },
  },
  primary: {
    ...border,
    ...focusShadow,
    background: "rgb(var(--light))",
    color: "rgb(var(--dark))",
    "&:active": {
      background: "rgb(var(--dark))",
      color: "rgb(var(--light))",
    },
  },
  tertiary: {
    background: "transparent",
    color: "rgb(var(--light))",
    border: 0,
    "&:focus,&:active": {
      background: "rgba(var(--light),0.05)",
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
  motif?: "primary" | "basic" | "tertiary";
} & (
  | {
      children: string;
    }
  | {
      icon: unknown;
    }
) &
  (
    | {
        size?: "medium";
        icon?: FC<{ fontSize: "small" }>;
      }
    | {
        size: "large";
        icon?: FC<{ fontSize: "medium" }>;
      }
  );

const defaultElement = "button";

type ButtonProps<E extends ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, ButtonOwnProps>;

export const Button: <E extends ElementType = typeof defaultElement>(
  props: ButtonProps<E>,
) => ReactElement | null = forwardRef(function Button<
  E extends ElementType = typeof defaultElement,
>(
  {
    className,
    children,
    grow,
    icon: Icon,
    motif = "basic",
    size = "medium",
    ...restProps
  }: ButtonProps<E>,
  ref: typeof restProps.ref,
) {
  const iconContent = Icon ? (
    <div
      className={cx(styles.icon, {
        [styles.mediumIcon]: size === "medium",
        [styles.largeIcon]: size === "large",
      })}
    >
      <Icon fontSize="small" />
    </div>
  ) : null;

  const textContent = children ? (
    <div
      className={cx({
        [styles.mediumText]: size === "medium",
        [styles.largeText]: size === "large",
      })}
    >
      {children}
    </div>
  ) : null;

  return (
    <Box
      as={defaultElement}
      className={cx(className, styles.base, {
        [styles.grow]: grow,
        [styles.basic]: motif === "basic",
        [styles.primary]: motif === "primary",
        [styles.tertiary]: motif === "tertiary",
        [styles.medium]: size === "medium",
        [styles.large]: size === "large",
      })}
      {...restProps}
      ref={ref}
    >
      {iconContent}
      {textContent}
    </Box>
  );
});
