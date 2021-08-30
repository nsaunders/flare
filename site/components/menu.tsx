import { FC } from "react";
import { css } from "demitasse";
import { Menu } from "@material-ui/icons";
import { Button } from "./button";

export const styles = /*#__PURE__*/ css({
  borderRadius: 9999,
  width: 36,
  height: 36,
});

export const MenuToggle: FC<{ children?: undefined }> = () => {
  return <Button motif="tertiary" className={styles} icon={Menu} />;
};
