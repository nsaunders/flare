import { ElementType, FC, ReactElement, forwardRef, useState } from "react";
import { PolymorphicComponentProps, Box } from "react-polymorphic-box";
import { css } from "demitasse";
import cx from "clsx";

export const styles = /*#__PURE__*/ css({
  wrapCommon: {
    position: "relative",
    borderRadius: 4,
    display: "inline-flex",
    paddingTop: 2,
    paddingRight: 6,
    paddingBottom: 2,
    paddingLeft: 6,
    background: "rgba(var(--light), 0.05)",
  },
  wrapBlur: {
    boxShadow: "inset 0 0 0 1px rgba(var(--light),0.1)",
  },
  wrapFocus: {
    boxShadow:
      "inset 0 0 0 1px rgba(var(--light),0.1),0 0 1px 1px rgba(var(--light),0.1)",
  },
  arrow: {
    position: "absolute",
    right: 8,
    top: "calc(50% - 2px)",
    width: 0,
    height: 0,
    borderColor: "transparent",
    borderStyle: "solid",
    borderWidth: 4,
    borderTopColor: "rgb(var(--light))",
    borderBottom: "none",
  },
  controlCommon: {
    appearance: "none",
    outline: "none",
    margin: 0,
    padding: 0,
    background: "transparent",
    border: "none",
    color: "rgb(var(--light))",
    fontFamily: "Lato",
    fontSize: 14,
    lineHeight: "20px",
  },
  controlSelect: {
    paddingRight: 24,
  },
});

const Wrap: FC<unknown> = ({ children }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
      className={cx(
        styles.wrapCommon,
        focus ? styles.wrapFocus : styles.wrapBlur,
      )}
    >
      {children}
    </div>
  );
};

const Arrow: FC<{ children?: undefined }> = () => (
  <div className={styles.arrow} />
);

const defaultElement = "input";

type InputOwnProps = unknown;

type InputProps<E extends ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, InputOwnProps>;

export const Input: <E extends ElementType = typeof defaultElement>(
  props: InputProps<E>,
) => ReactElement | null = forwardRef(function Input<
  E extends ElementType = typeof defaultElement,
>({ className, ...restProps }: InputProps<E>, ref: typeof restProps.ref) {
  return (
    <Wrap>
      <Box
        as={defaultElement}
        className={cx(
          className,
          styles.controlCommon,
          restProps.as === "select" && styles.controlSelect,
        )}
        {...restProps}
        ref={ref}
      />
      {restProps.as === "select" && <Arrow />}
    </Wrap>
  );
});
