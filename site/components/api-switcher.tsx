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
    maxWidth: 400,
    fontFamily: "Lato",
    fontSize: 14,
    backgroundColor: "rgba(var(--light), 0.05)",
  },
  markerCommon: {
    position: "absolute",
    borderRadius: 3,
    width: "calc(50% - 2px)",
    top: 2,
    bottom: 2,
    backgroundColor: "rgba(var(--dark), 0.5)",
    transitionProperty: "left",
    transitionDuration: "125ms",
  },
  markerLeft: {
    left: 2,
  },
  markerRight: {
    left: "50%",
  },
  itemCommon: {
    cursor: "pointer",
    margin: 0,
    appearance: "none",
    background: "transparent",
    border: "none",
    outline: "none",
    font: "inherit",
    textDecoration: "none",
    zIndex: 1,
    flex: 1,
    textAlign: "center",
    padding: 8,
    transitionProperty: "color",
    transitionDuration: "125ms",
  },
  itemSelected: {
    color: "rgb(var(--light))",
  },
  itemUnselected: {
    color: "rgba(var(--light),0.5)",
  },
});

export const APISwitcher: VFC<unknown> = () => {
  const selected = useRouter().pathname.endsWith("/flare-core")
    ? "flare-core"
    : "flare";
  return (
    <div className={styles.container}>
      <div
        className={cx(
          styles.markerCommon,
          selected === "flare" ? styles.markerLeft : styles.markerRight,
        )}
      />
      {(["flare", "flare-core"] as const).map((api) => (
        <Link href={`/api-docs/${api}`} key={api}>
          <a
            className={cx(
              styles.itemCommon,
              api === selected ? styles.itemSelected : styles.itemUnselected,
            )}
          >
            {api}
          </a>
        </Link>
      ))}
    </div>
  );
};
