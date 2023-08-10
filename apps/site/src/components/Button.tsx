import type { ComponentProps, FC } from "react";
import styled from "styled-components";

type ButtonContainerProps = {
  grow: boolean;
  motif: "primary" | "basic" | "tertiary";
  size: "medium" | "large";
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  outline: none;
  margin: 0;
  border-radius: 4px;
  font-family: "Lato";
  line-height: 1;
  text-decoration: none;
  background: ${({ theme: { bg } }) => bg()};
  color: ${({ theme: { fg } }) => fg()};
  padding-top: 0;
  padding-bottom: 0;
  ${({ motif, theme: { fg } }) =>
    (motif === "primary" || motif === "basic") &&
    `
    border-width: 1px;
    border-style: solid;
    border-color: ${fg()};
    &:focus, &:active {
      box-shadow: 0 0 0.166em 0.083em ${fg(0.5)};
    }
  `}
  ${({ motif, theme: { bg, fg } }) =>
    motif === "primary" &&
    `
    background: ${fg()};
    color: ${bg()};
    &:active {
      background: ${bg()};
      color: ${fg()};
    }
  `}
  ${({ motif, theme: { bg, fg } }) =>
    motif === "basic" &&
    `
    background: ${bg()};
    color: ${fg()};
    &:active {
      background: ${fg()};
      color: ${bg()};
    },
  `}
  ${({ motif, theme: { fg } }) =>
    motif === "tertiary" &&
    `
    background: transparent;
    color: ${fg()};
    border: 0;
    &:focus, &:active {
      background: ${fg(0.05)};
    }
  `}
  ${({ size }) =>
    size === "medium" &&
    `
    font-size: 12px;
    padding-right: 7px;
    padding-left: 7px;
  `}
  ${({ size }) =>
    size === "large" &&
    `
    font-size: 16px;
    padding-right: 11px;
    padding-left: 11px;
  `}
  ${({ grow }) =>
    grow &&
    `
    transition-property: transform;
    transition-duration: 250ms;
    &:focus, &:hover {
      transform: scale(1.05);
    }
  `}
`;

type IconWrapProps = { size: "medium" | "large" };

const IconWrap = styled.div<IconWrapProps>`
  display: inline-flex;
  padding-top: ${({ size }) => (size === "large" ? 3 : 1)}px;
  padding-bottom: ${({ size }) => (size === "large" ? 3 : 1)}px;
`;

type TextWrapProps = { size: "medium" | "large" };

const TextWrap = styled.div<TextWrapProps>`
  ${({ size }) => `
    padding-top: ${size === "medium" ? 5 : 7}px;
    padding-bottom: ${size === "medium" ? 5 : 7}px;

    .icon ~ & {
      margin-left: 8px;
    }
  `}
`;

type Icon = FC<{ size?: "small" | "medium" }>;

type ButtonContentProps =
  | {
      label: string;
      icon?: undefined;
    }
  | {
      label?: undefined;
      icon?: Icon;
    };

type ButtonProps = ComponentProps<typeof ButtonContainer> & ButtonContentProps;

export default function Button({
  children,
  icon: Icon,
  motif = "basic",
  size = "medium",
  ...restProps
}: ButtonProps) {
  const iconContent = Icon && (
    <IconWrap className="icon" size={size}>
      <Icon size="small" />
    </IconWrap>
  );

  const textContent = children && <TextWrap size={size}>{children}</TextWrap>;

  return (
    <ButtonContainer {...{ motif, size, ...restProps }}>
      {iconContent}
      {textContent}
    </ButtonContainer>
  );
}
