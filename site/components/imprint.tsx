import { FC, createContext, useState, useContext, useEffect } from "react";
import { css } from "demitasse";
import cx from "clsx";
import { Logo, LogoOwnProps } from "./logo";
import { useMeasure } from "react-use";

export const ImprintActions = createContext<{
  setY: (y: "auto" | number) => void;
  setSize: (size: Exclude<LogoOwnProps["size"], undefined>) => void;
  reset: () => void;
}>({
  setY: () => {
    /*noop*/
  },
  setSize: () => {
    /*noop*/
  },
  reset: () => {
    /*noop*/
  },
});

export const styles = /*#__PURE__*/ css({
  imprint: {
    position: "absolute",
    transitionProperty: "top",
    transitionDuration: "250ms",
    transitionDelay: "250ms",
  },
  zone: {
    width: 0,
  },
  zoneMedium: {
    height: 48,
  },
  zoneLarge: {
    height: 64,
  },
});

export const Imprint: FC<{ headerHeight: number }> = ({
  children,
  headerHeight,
}) => {
  const [ref, { width, height }] = useMeasure<HTMLHeadingElement>();
  const [y, setY] = useState<"auto" | number>("auto");
  const [size, setSize] =
    useState<Exclude<LogoOwnProps["size"], undefined>>("medium");
  return (
    <ImprintActions.Provider
      value={{
        setY,
        setSize,
        reset: () => {
          setY("auto");
          setSize("medium");
        },
      }}
    >
      <div
        className={styles.imprint}
        style={{
          zIndex: 1,
          top: y === "auto" ? (headerHeight - height) / 2 : y,
          left: `calc(50% - ${width / 2}px)`,
        }}
      >
        <Logo ref={ref} size={size} />
      </div>
      {children}
    </ImprintActions.Provider>
  );
};

export const ImprintZone: FC<Pick<LogoOwnProps, "size">> = ({
  size = "medium",
}) => {
  const [placeholder, ref] = useState<HTMLHeadingElement | null>(null);

  const imprint = useContext(ImprintActions);

  useEffect(() => {
    const listener = () => {
      imprint.setY(placeholder?.getBoundingClientRect().y || 0);
    };
    listener();
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [imprint, placeholder]);

  useEffect(() => {
    imprint.setSize(size);
  }, [imprint, size]);

  useEffect(() => {
    return () => {
      imprint.reset();
    };
  }, [imprint]);

  return (
    <div
      ref={ref}
      className={cx(
        styles.zone,
        size === "large" ? styles.zoneLarge : styles.zoneMedium,
      )}
    />
  );
};
