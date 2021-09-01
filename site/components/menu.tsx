import { FC, useEffect, useRef } from "react";
import Link from "next/link";
import { css } from "demitasse";
import cx from "classnames";
import { Menu as MenuIcon, MenuOpen as CloseIcon } from "@material-ui/icons";
import { Button } from "./button";
import { useClickAway } from "react-use";
import menu from "../menu.json";

export const styles = /*#__PURE__*/ css({
  toggle: {
    borderRadius: 9999,
    width: 36,
    height: 36,
    position: "relative",
  },
  menu: {
    outline: "none",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    background: "rgba(var(--light),0.05)",
    paddingTop: 16,
    paddingBottom: 16,
    transitionProperty: "padding-left,padding-right",
    transitionDuration: "250ms",
  },
  menuOpen: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  link: {
    outline: "none",
    display: "inline-block",
    color: "rgb(var(--light))",
    textDecoration: "none",
    "&:focus": {
      textDecoration: "underline",
    },
  },
  linkWrap: {
    "& + &": {
      marginTop: 16,
    },
  },
  items: {
    transitionProperty: "transform,opacity",
    transitionDuration: "250ms",
    fontFamily: "Lato",
    fontSize: 12,
    lineHeight: 1,
  },
  itemsClosed: {
    transform: "translateX(-16px)",
    opacity: 0,
  },
});

export const MenuToggle: FC<{
  children?: undefined;
  setting: boolean;
  onChange: (setting: boolean) => void;
}> = ({ setting, onChange }) => {
  const button = useRef<HTMLButtonElement>(null);
  useClickAway(button, () => {
    setTimeout(() => {
      onChange(false);
    }, 65);
  });
  return (
    <Button
      ref={button}
      motif="tertiary"
      className={styles.toggle}
      icon={setting ? CloseIcon : MenuIcon}
      onClick={() => {
        onChange(!setting);
      }}
    />
  );
};

export const Menu: FC<{ children?: undefined; open?: boolean }> = ({
  open,
}) => {
  const menuEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && menuEl.current) {
      menuEl.current.focus();
    }
  }, [open]);
  return (
    <div
      tabIndex={open ? 0 : -1}
      ref={menuEl}
      className={cx(styles.menu, open && styles.menuOpen)}
    >
      <div className={cx(styles.items, !open && styles.itemsClosed)}>
        {menu.map(([href, title]) => (
          <div className={styles.linkWrap} key={title}>
            <Link href={href}>
              <a className={styles.link} tabIndex={open ? 0 : -1}>
                {title}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
