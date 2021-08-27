import { css } from "demitasse";
import {
  createContext,
  ElementType,
  forwardRef,
  ReactElement,
  useContext,
} from "react";
import { PolymorphicComponentProps, Box } from "react-polymorphic-box";
import cx from "clsx";

export const styles = /*#__PURE__*/ css({
  container: {
    display: "inline-flex",
  },
  containerBlock: {
    display: "flex",
  },
  containerAlignItemsStart: {
    alignItems: "flex-start",
  },
  containerAlignItemsCenter: {
    alignItems: "center",
  },
  containerAlignItemsEnd: {
    alignItems: "flex-end",
  },
  containerColumn: {
    flexDirection: "column",
  },
  containerColumnReverse: {
    flexDirection: "column-reverse",
  },
  containerRowReverse: {
    flexDirection: "row-reverse",
  },
  containerSpacing0: {
    margin: 0,
  },
  containerSpacing8: {
    margin: -4,
  },
  containerSpacing16: {
    margin: -16,
  },
  containerSpacing48: {
    margin: -24,
  },
  containerSpacing64: {
    margin: -32,
  },
  itemSpacing0: {
    margin: 0,
  },
  itemSpacing8: {
    margin: 4,
  },
  itemSpacing16: {
    margin: 8,
  },
  itemSpacing48: {
    margin: 24,
  },
  itemSpacing64: {
    margin: 32,
  },
});

const stackDefaultElement = "div";

type StackOwnProps = {
  alignItems?: "start" | "center" | "end";
  block?: boolean;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  spacing?: 0 | 8 | 16 | 48 | 64;
};

type StackProps<E extends ElementType = typeof stackDefaultElement> =
  PolymorphicComponentProps<E, StackOwnProps>;

const Spacing = createContext(0);

export const Stack: <E extends ElementType = typeof stackDefaultElement>(
  props: StackProps<E>,
) => ReactElement | null = /*#__PURE__*/ forwardRef(function Stack<
  E extends ElementType = typeof stackDefaultElement,
>(
  {
    alignItems,
    block,
    className,
    direction,
    spacing = 0,
    ...restProps
  }: StackProps<E>,
  ref: typeof restProps.ref,
) {
  return (
    <Spacing.Provider value={spacing}>
      <Box
        as={stackDefaultElement}
        className={cx(className, styles.container, {
          [styles.containerBlock]: block,
          [styles.containerAlignItemsStart]: alignItems === "start",
          [styles.containerAlignItemsCenter]: alignItems === "center",
          [styles.containerAlignItemsEnd]: alignItems === "end",
          [styles.containerColumn]: direction === "column",
          [styles.containerColumnReverse]: direction === "column-reverse",
          [styles.containerRowReverse]: direction === "row-reverse",
          [styles.containerSpacing0]: spacing === 0,
          [styles.containerSpacing8]: spacing === 8,
          [styles.containerSpacing16]: spacing === 16,
          [styles.containerSpacing48]: spacing === 48,
          [styles.containerSpacing64]: spacing === 64,
        })}
        {...restProps}
        ref={ref}
      />
    </Spacing.Provider>
  );
});

const itemDefaultElement = "div";

type ItemProps<E extends ElementType = typeof itemDefaultElement> =
  PolymorphicComponentProps<E, unknown>;

export const Item: <E extends ElementType = typeof itemDefaultElement>(
  props: ItemProps<E>,
) => ReactElement | null = /*#__PURE__*/ forwardRef(function Item<
  E extends ElementType = typeof itemDefaultElement,
>({ className, ...restProps }: ItemProps<E>, ref: typeof restProps.ref) {
  const spacing = useContext(Spacing);
  return (
    <Box
      as={itemDefaultElement}
      className={cx(className, {
        [styles.itemSpacing0]: spacing === 0,
        [styles.itemSpacing8]: spacing === 8,
        [styles.itemSpacing16]: spacing === 16,
        [styles.itemSpacing48]: spacing === 48,
        [styles.itemSpacing64]: spacing === 64,
      })}
      {...restProps}
      ref={ref}
    />
  );
});
