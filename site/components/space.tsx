import { ElementType, ReactElement, forwardRef } from "react";
import { Box, PolymorphicComponentProps } from "react-polymorphic-box";
import cx from "clsx";
import { css } from "demitasse";

type Prop<K extends string, V> = Record<K, V>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any
  ? R
  : never;

type MakeProps<K extends string, V> = UnionToIntersection<
  K extends string ? Prop<K, V> : never
>;

type Values = 8;

type SpaceOwnProps =
  | (Partial<MakeProps<"top" | "right" | "bottom" | "left", Values>> & {
      around?: undefined;
    })
  | MakeProps<"around", Values>;

const defaultElement = "div";

type SpaceProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  SpaceOwnProps
>;

export const styles = /*#__PURE__*/ css({
  base: {
    boxSizing: "border-box",
    margin: 0,
  },
  top8: {
    paddingTop: 8,
  },
  right8: {
    paddingRight: 8,
  },
  bottom8: {
    paddingBottom: 8,
  },
  left8: {
    paddingLeft: 8,
  },
});

export const Space: <E extends ElementType = typeof defaultElement>(
  props: SpaceProps<E>,
) => ReactElement | null = forwardRef(function Space<
  E extends ElementType = typeof defaultElement,
>(
  { around, bottom, className, left, right, top, ...restProps }: SpaceProps<E>,
  ref: typeof restProps.ref,
) {
  return (
    <Box
      as={defaultElement}
      className={cx(className, styles.base, {
        [styles.top8]: around === 8 || top === 8,
        [styles.right8]: around === 8 || right === 8,
        [styles.bottom8]: around === 8 || bottom === 8,
        [styles.left8]: around === 8 || left === 8,
      })}
      {...restProps}
      ref={ref}
    />
  );
});
