import { ElementType, ReactElement, forwardRef } from "react";
import { PolymorphicComponentProps, Box } from "react-polymorphic-box";
import cx from "clsx";
import { css } from "demitasse";

export const styles = /*#__PURE__*/ css({
  base: {
    margin: 0,
    fontFamily: "Gruppo",
    fontWeight: "normal",
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    transitionProperty: "font-size",
    transitionDuration: "250ms",
    "&::after": {
      content: "",
      marginRight: "-0.5em",
    },
  },
  medium: {
    fontSize: 48,
  },
  large: {
    fontSize: 64,
  },
});

export type LogoOwnProps = { size?: "medium" | "large"; children?: undefined };

const defaultElement = "h1";

type LogoProps<E extends ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, LogoOwnProps>;

export const Logo: <E extends ElementType = typeof defaultElement>(
  props: LogoProps<E>,
) => ReactElement | null = /*#__PURE__*/ forwardRef(function Logo<
  E extends ElementType = typeof defaultElement,
>({ className, size, ...restProps }: LogoProps<E>, ref: typeof restProps.ref) {
  return (
    <Box
      as={defaultElement}
      className={cx(className, styles.base, {
        [styles.medium]: size === "medium",
        [styles.large]: size === "large",
      })}
      {...restProps}
      ref={ref}
    >
      Flare
    </Box>
  );
});
