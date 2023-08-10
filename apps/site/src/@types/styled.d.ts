import type { FC } from "react";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    ToggleIcon: FC<{ size?: "small" | "medium" }>;
    bg(alpha?: number): string;
    fg(alpha?: number): string;
  }
}
