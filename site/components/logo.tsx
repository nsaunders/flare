import {ElementType, ReactElement, forwardRef} from "react";
import {PolymorphicComponentProps,Box} from "react-polymorphic-box";
import cx from "clsx";
import {css} from "demitasse";

export const styles = /*#__PURE__*/ css({
  base: {
    margin: 0,
    fontFamily: "Gruppo",
    lineHeight: 1,
    textTransform: "uppercase",
    letterSpacing: "0.5em",
    "&::after": {
      content: "",
      marginRight: "-0.5em",
    },
  },
  width244: {
    fontSize: 48,
  },
  width325: {
    fontSize: 64,
  },
});

const byWidth = {
  244: "width244",
  325: "width325",
} as const;

const byHeight = {
  48: "width244",
  64: "width325",
} as const;

type LogoOwnProps = ({
  width?: 244 | 325;
} | {
  height: 48 | 64;
}) & { children?: undefined; };

const defaultElement = "div";

type LogoProps<E extends ElementType = typeof defaultElement> = PolymorphicComponentProps<E, LogoOwnProps>;

export const Logo: <E extends ElementType = typeof defaultElement>(props: LogoProps<E>) => ReactElement | null = /*#__PURE__*/ forwardRef(
  function Logo<E extends ElementType = typeof defaultElement>({ className, height, width = 244, ...restProps }: LogoProps<E>, ref: typeof restProps.ref) {
    return (
      <Box
        as={defaultElement}
        className={cx(className, styles.base, height ? styles[byHeight[height]] : styles[byWidth[width]])}
        {...restProps}
        ref={ref}>
        Flare
      </Box>
    );
  }
);
