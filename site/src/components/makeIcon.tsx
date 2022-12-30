import type { FC, ReactNode } from "react";
import styled from "styled-components";

const IconContainer = styled.svg<{ size: "small" | "medium" }>`
  fill: currentColor;
  font-size: ${({ size }) => (size === "small" ? 20 : 24)}px;
  min-width: 1em;
  max-width: 1em;
  min-height: 1em;
  max-height: 1em;
`;

export default function makeIcon(
  displayName: string,
  children: ReactNode,
): FC<{ size?: "small" | "medium" }> {
  const component = ({ size = "medium" }: { size?: "small" | "medium" }) => (
    <IconContainer size={size} viewBox="0 0 24 24">
      {children}
    </IconContainer>
  );
  component.displayName = displayName;
  return component;
}
