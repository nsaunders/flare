import {ElementType, ReactElement, forwardRef} from "react";
import {PolymorphicComponentProps,Box} from "react-polymorphic-box";
import cx from "clsx";
import {css} from "demitasse";

export const styles = /*#__PURE__*/ css({
  base: {
    margin: 0,
    fontFamily: "Lato",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 1,
    whiteSpace: "nowrap",
    "&::after": {
      content: "",
      marginRight: -2,
    },
  },
  width242: {
    letterSpacing: "0.07em",
  },
  width310: {
    letterSpacing: "0.21em",
  },
});

const byWidth = {
  242: "width242",
  310: "width310",
} as const;

type TaglineOwnProps = {
  width?: 242 | 310;
children?: undefined; };

const defaultElement = "div";

type TaglineProps<E extends ElementType = typeof defaultElement> = PolymorphicComponentProps<E, TaglineOwnProps>;

export const Tagline: <E extends ElementType = typeof defaultElement>(props: TaglineProps<E>) => ReactElement | null = /*#__PURE__*/ forwardRef(
  function Tagline<E extends ElementType = typeof defaultElement>({ className, width = 242, ...restProps }: TaglineProps<E>, ref: typeof restProps.ref) {
    return (
      <Box
        as={defaultElement}
        className={cx(className, styles.base, styles[byWidth[width]])}
        {...restProps}
        ref={ref}>
        Applicative-style UIs in TypeScript
      </Box>
    );
  }
);
