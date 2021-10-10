import { FC, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "demitasse";
import cx from "clsx";
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
  },
  link: {
    outline: "none",
    display: "block",
    color: "rgba(var(--light),0.5)",
    textDecoration: "none",
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    "&:focus": {
      textDecoration: "underline",
    },
    "&:first-child": {
      marginTop: 8,
    },
  },
  linkActive: {
    background: "rgba(var(--dark), 0.5)",
    color: "rgb(var(--light))",
  },
  items: {
    transitionProperty: "transform,opacity",
    transitionDuration: "250ms",
    fontFamily: "Lato",
    fontSize: 16,
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
  const { pathname } = useRouter();
  return (
    <div tabIndex={open ? 0 : -1} ref={menuEl} className={styles.menu}>
      <div className={cx(styles.items, !open && styles.itemsClosed)}>
        {menu.map(([href, title]) => (
          <Link href={href} key={title}>
            <a
              className={cx(
                styles.link,
                pathname.startsWith(href) && styles.linkActive,
              )}
              tabIndex={open ? 0 : -1}
            >
              {title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
