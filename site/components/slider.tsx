import { FC, InputHTMLAttributes } from "react";
import { css } from "demitasse";
import cx from "clsx";

const defaultTrackStyles = {
  width: "auto",
  height: 4,
  border: "none",
  borderRadius: 9999,
} as const;

const trackBlur = {
  background: "rgba(var(--light),0.05)",
} as const;

const trackFocus = {
  background: "rgba(var(--light),0.1)",
} as const;

const defaultThumbStyles = {
  border: "none",
  width: 16,
  height: 16,
  borderRadius: 9999,
  background: "rgb(var(--light))",
} as const;

const thumbFocusIndicator = {
  boxShadow: "0 0 2px 1px rgba(var(--light),0.5)",
} as const;

export const styles = /*#__PURE__*/ css({
  WebkitAppearance: "none",
  outline: "none",
  width: defaultTrackStyles.width,
  background: "transparent",
  "&::-webkit-slider-runnable-track": defaultTrackStyles,
  "&:focus::-webkit-slider-runnable-track": trackFocus,
  "&:not(:focus)::-webkit-slider-runnable-track": trackBlur,
  "&::-webkit-slider-thumb": {
    WebkitAppearance: "none",
    marginTop: -6,
    ...defaultThumbStyles,
  },
  "&:focus::-webkit-slider-thumb": thumbFocusIndicator,
  "&::-moz-range-track": defaultTrackStyles,
  "&::-moz-range-thumb": defaultThumbStyles,
  "&:focus::-moz-range-thumb": thumbFocusIndicator,
  "&:focus::-moz-range-track": trackFocus,
  "&:not(:focus)::-moz-range-track": trackBlur,
});

type SliderProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "min" | "max" | "onChange" | "step" | "style" | "value"
>;

export const Slider: FC<SliderProps & { children?: undefined }> = ({
  className,
  ...restProps
}) => <input type="range" className={cx(className, styles)} {...restProps} />;
