import {cloneElement, FC, KeyboardEvent, ReactElement, useEffect, useRef, useState} from "react";
import {css} from "demitasse";
import cx from "clsx";

export const styles = css({
  container: {
    display: "flex",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    borderRadius: 4,
    paddingRight: 0,
    paddingLeft: 7,
    "&:focus-within": {
      boxShadow: "0 0 0.166em 0.083em rgba(255,255,255,0.5)",
    },
  },
  containerActive: {
    background: "#fff",
    color: "#000",
  },
  buttonWrap: {
    marginRight: 8,
    paddingTop: 6,
  },
  button: {
    appearance: "none",
    outline: "none",
    background: "transparent",
    border: 0,
    margin: 0,
    padding: 0,
    color: "inherit",
    cursor: "pointer",
  },
  mainTextWrap: {
    flex: 1,
    fontFamily: "'Courier Prime'",
    fontSize: 16,
    lineHeight: 1,
    height: 30,
    overflow: "hidden",
  },
  mainText: {
    position: "relative",
    top: 0,
    transitionProperty: "top",
    transitionDuration: "0.5s",
  },
  mainTextScrolled: {
    top: -30,
  },
  mainTextItem: {
    paddingTop: 8,
    paddingBottom: 6,
    transitionProperty: "opacity",
    transitionDuration: "0.5s",
  },
  mainTextItemInactive: {
    opacity: 0,
  },
  spinnerWrap: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
  },
  spinner: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
    appearance: "none",
    outline: "none",
    margin: 0,
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
    border: 0,
    background: "transparent",
    color: "inherit",
    "& + &": {
      alignItems: "flex-start",
    },
  },
});

type InstallProps = {
  children?: undefined;
  packageName: string;
};

export const Install: FC<InstallProps> = ({ packageName }) => {
  const [packageManager, setPackageManager] = useState<"npm" | "yarn">("npm");
  const copyButtonEl = useRef<HTMLButtonElement>(null);
  const [copyButton, active] = useActive(
    <button ref={copyButtonEl} onClick={() => { copyToClipboard(`${packageManager === "yarn" ? "yarn add" : "npm install"} ${packageName}`); }} className={styles.button}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor" />
      </svg>
    </button>
  );
  return (
    <div className={cx(styles.container, active && styles.containerActive)} onKeyDown={({ key }) => {
      if (key === "ArrowUp" && packageManager === "yarn") {
        setPackageManager("npm");
      }
      else if (key === "ArrowDown" && packageManager === "npm") {
        setPackageManager("yarn");
      }
    }}>
      <div className={styles.buttonWrap}>{copyButton}</div>
      <div className={styles.mainTextWrap}>
        <div className={cx(styles.mainText, packageManager === "yarn" && styles.mainTextScrolled)}>
          <div className={cx(styles.mainTextItem, packageManager !== "npm" && styles.mainTextItemInactive)}>npm install {packageName}</div>
          <div className={cx(styles.mainTextItem, packageManager !== "yarn" && styles.mainTextItemInactive)}>yarn add {packageName}</div>
        </div>
      </div>
      <div className={styles.spinnerWrap}>
        <button className={styles.spinner} tabIndex={-1} onClick={() => {
          if (packageManager !== "npm") {
            setPackageManager("npm");
          }
          if (copyButtonEl.current) {
            copyButtonEl.current.focus();
          }
        }}>
          <svg viewBox="0 0 8 4" width="8" height="4">
            <path d="M0,4 l4,-4 l4,4 h-2 l-2,-2 l-2,2" fill="currentColor" />
          </svg>
        </button>
        <button className={styles.spinner} tabIndex={-1} onClick={() => {
          if (packageManager !== "yarn") {
            setPackageManager("yarn");
          }
          if (copyButtonEl.current) {
            copyButtonEl.current.focus();
          }
        }}>
          <svg viewBox="0 0 8 4" width="8" height="4">
            <path d="M0,0 l4,4 l4,-4 h-2 l-2,2 l-2,-2" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
};

function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function useActive(el: ReactElement): [ReactElement, boolean] {
  const [activeClick, setActiveClick] = useState(false);
  const [activeKey, setActiveKey] = useState<"Enter" | " " | null>(null);
  return [
    cloneElement(el, {
      onMouseDown: () => { setActiveClick(true); },
      onMouseLeave: () => { setActiveClick(false); },
      onMouseUp: () => { setActiveClick(false); },
      onKeyDown: (e: KeyboardEvent<unknown>) => { setActiveKey(e.key === " " || e.key === "Enter" ? e.key : null); },
      onKeyUp: () => { setActiveKey(null); },
    }),
    activeClick || !!activeKey,
  ];
}
