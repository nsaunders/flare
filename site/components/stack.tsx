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
  containerCommon: {
    display: "inline-flex",
    margin: 0,
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
  containerJustifySpaceBetween: {
    justifyContent: "space-between",
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
  itemSpacing0: {
    margin: 0,
  },
  itemSpacing2: {
    margin: 1,
  },
  itemSpacing4: {
    margin: 2,
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
  itemInRow: {
    "&&": {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
    },
    "&:first-child": {
      marginLeft: 0,
    },
  },
  itemInColumn: {
    "&&": {
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
    },
    "&:first-child": {
      marginTop: 0,
    },
  },
  itemInRowReverse: {
    "&&": {
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 0,
    },
    "&:first-child": {
      marginRight: 0,
    },
  },
  itemInColumnReverse: {
    "&&": {
      marginRight: 0,
      marginTop: 0,
      marginLeft: 0,
    },
    "&:first-child": {
      marginBottom: 0,
    },
  },
});

const stackDefaultElement = "div";

type StackOwnProps = {
  alignItems?: "start" | "center" | "end";
  block?: boolean;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: "space-between";
  spacing?: 0 | 2 | 4 | 8 | 16 | 48 | 64;
};

type StackProps<E extends ElementType = typeof stackDefaultElement> =
  PolymorphicComponentProps<E, StackOwnProps>;

const Spacing = createContext<
  [
    Exclude<StackOwnProps["spacing"], undefined>,
    Exclude<StackOwnProps["direction"], undefined>,
  ]
>([0, "row"]);

export const Stack: <E extends ElementType = typeof stackDefaultElement>(
  props: StackProps<E>,
) => ReactElement | null = /*#__PURE__*/ forwardRef(function Stack<
  E extends ElementType = typeof stackDefaultElement,
>(
  {
    alignItems,
    block,
    className,
    direction = "row",
    justifyContent,
    spacing = 0,
    ...restProps
  }: StackProps<E>,
  ref: typeof restProps.ref,
) {
  return (
    <Spacing.Provider value={[spacing, direction]}>
      <Box
        as={stackDefaultElement}
        className={cx(className, styles.containerCommon, {
          [styles.containerBlock]: block,
          [styles.containerAlignItemsStart]: alignItems === "start",
          [styles.containerAlignItemsCenter]: alignItems === "center",
          [styles.containerAlignItemsEnd]: alignItems === "end",
          [styles.containerJustifySpaceBetween]:
            justifyContent === "space-between",
          [styles.containerColumn]: direction === "column",
          [styles.containerColumnReverse]: direction === "column-reverse",
          [styles.containerRowReverse]: direction === "row-reverse",
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
  const [spacing, direction] = useContext(Spacing);
  return (
    <Box
      as={itemDefaultElement}
      className={cx(className, {
        [styles.itemInRow]: direction === "row",
        [styles.itemInRowReverse]: direction === "row-reverse",
        [styles.itemInColumn]: direction === "column",
        [styles.itemInColumnReverse]: direction === "column-reverse",
        [styles.itemSpacing0]: spacing === 0,
        [styles.itemSpacing2]: spacing === 2,
        [styles.itemSpacing4]: spacing === 4,
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
