import type { ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";
import { ThemeProvider } from "styled-components";
import Brightness2Icon from "./Brightness2Icon";
import WbSunnyIcon from "./WbSunnyIcon";

const ModeToggle = createContext(() => {
  /*noop*/
});

const colorFn = (r: number, g: number, b: number) => (a: number) => {
  if (a !== undefined && a !== null) {
    return `rgba(${r},${g},${b},${a})`;
  }
  return `rgb(${r},${g},${b})`;
};

const themes = {
  dark: {
    ToggleIcon: WbSunnyIcon,
    bg: colorFn(0, 0, 0),
    fg: colorFn(255, 255, 255),
  },
  light: {
    ToggleIcon: Brightness2Icon,
    bg: colorFn(255, 255, 255),
    fg: colorFn(0, 0, 0),
  },
} as const;

const useToggle = (): [boolean, () => void] => useReducer((x) => !x, false);

export default function Mode({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  const [light, toggle] = useToggle();
  return (
    <ThemeProvider theme={themes[light ? "light" : "dark"]}>
      <ModeToggle.Provider value={toggle}>{children}</ModeToggle.Provider>
    </ThemeProvider>
  );
}

export const useModeToggle = () => useContext(ModeToggle);
