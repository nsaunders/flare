import { createContext, FC, useContext } from "react";
import { css } from "demitasse";
import { Brightness2, WbSunny } from "@material-ui/icons";
import { Button } from "./button";

type Mode = "dark" | "light";

export const ModeSetting = createContext<[Mode, (mode: Mode) => void]>([
  "dark",
  () => {
    /*noop*/
  },
]);

export const styles = /*#__PURE__*/ css({
  borderRadius: 9999,
  width: 36,
  height: 36,
});

export const ModeToggle: FC<{ children?: undefined }> = () => {
  const [setting, onChange] = useContext(ModeSetting);
  return (
    <Button
      motif="tertiary"
      className={styles}
      icon={setting === "dark" ? WbSunny : Brightness2}
      onClick={() => {
        onChange(setting === "dark" ? "light" : "dark");
      }}
    />
  );
};
