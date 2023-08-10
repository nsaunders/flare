import { ElementType, ReactElement, forwardRef } from "react";
import { PolymorphicComponentProps } from "react-polymorphic-box";
import styled, { DefaultTheme } from "styled-components";

const wrapBorder = ({ theme: { fg } }: { theme: DefaultTheme }) =>
  `inset 0 0 0 1px ${fg(0.1)}`;

const Wrap = styled.div`
  position: relative;
  border-radius: 4px;
  display: inline-flex;
  padding-top: 2px;
  padding-right: 6px;
  padding-bottom: 2px;
  padding-left: 6px;
  background: ${({ theme: { fg } }) => fg(0.05)};
  box-shadow: ${wrapBorder};

  &:focus-within {
    box-shadow: ${wrapBorder}, 0 0 1px 1px ${({ theme: { fg } }) => fg(0.1)};
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 8px;
  top: calc(50% - 2px);
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 4px;
  border-top-color: ${({ theme: { fg } }) => fg()};
  border-bottom: none;
`;

const Control = styled.input<{ as?: unknown }>`
  appearance: none;
  outline: none;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  color: ${({ theme: { fg } }) => fg()};
  font-family: "Lato";
  font-size: 14px;
  line-height: 20px;
  ${({ as }) => as === "select" && "padding-right: 24px;"}
`;

const defaultElement = "input";

type InputOwnProps = unknown;

type InputProps<E extends ElementType = typeof defaultElement> =
  PolymorphicComponentProps<E, InputOwnProps>;

const Input: <E extends ElementType = typeof defaultElement>(
  props: InputProps<E>,
) => ReactElement | null = forwardRef(function Input<
  E extends ElementType = typeof defaultElement,
>({ className, ...restProps }: InputProps<E>, ref: typeof restProps.ref) {
  return (
    <Wrap className={className}>
      <Control as={defaultElement} {...restProps} ref={ref} />
      {restProps.as === "select" && <Arrow />}
    </Wrap>
  );
});

export default Input;
