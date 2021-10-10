import { VFC } from "react";
import { css } from "demitasse";
import Link from "next/link";
import { useRouter } from "next/router";
import cx from "clsx";

export const styles = /*#__PURE__*/ css({
  container: {
    borderRadius: 4,
    position: "relative",
    display: "inline-flex",
    width: "100%",
    maxWidth: 500,
    fontFamily: "Lato",
    fontSize: 14,
    backgroundColor: "rgba(var(--light), 0.05)",
  },
  markerCommon: {
    position: "absolute",
    borderRadius: 3,
    width: "calc(100% / 3 - 2px)",
    top: 2,
    bottom: 2,
    backgroundColor: "rgba(var(--dark), 0.5)",
    transitionProperty: "left",
    transitionDuration: "125ms",
  },
  markerLeft: {
    left: 2,
  },
  markerCenter: {
    left: "calc(100% / 3 + 1px)",
  },
  markerRight: {
    left: "calc(200% / 3)",
  },
  itemCommon: {
    cursor: "pointer",
    margin: 0,
    appearance: "none",
    background: "transparent",
    border: "none",
    outline: "none",
    font: "inherit",
    zIndex: 1,
    flex: 1,
    textAlign: "center",
    padding: 8,
    transitionProperty: "color",
    transitionDuration: "125ms",
    "&:not(:focus)": {
      textDecoration: "none",
    }
  },
  itemSelected: {
    color: "rgb(var(--light))",
  },
  itemUnselected: {
    color: "rgba(var(--light),0.5)",
  },
});

const APISwitcher: VFC<unknown> = () => {
  const routes = [
    ["", "Overview"],
    ["/flare", "flare"],
    ["/flare-core", "flare-core"],
  ];
  const selected = (useRouter().pathname.match(/api\-docs(\/.+)/) || [
    null,
    "",
  ])[1];
  return (
    <div className={styles.container}>
      <div
        className={cx(styles.markerCommon, {
          [styles.markerLeft]: selected === "",
          [styles.markerCenter]: selected === "/flare",
          [styles.markerRight]: selected === "/flare-core",
        })}
      />
      {routes.map(([path, name]) => (
        <Link href={`/api-docs${path}`} key={name}>
          <a
            className={cx(
              styles.itemCommon,
              path === selected ? styles.itemSelected : styles.itemUnselected,
            )}
          >
            {name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default APISwitcher;
