import { FC, InputHTMLAttributes } from "react";
import styled, { DefaultTheme } from "styled-components";

const defaultWidth = "auto";

const defaultTrackStyles = `
  width: ${defaultWidth};
  height: 4px;
  border: none;
  border-radius: 9999px;
`;

const trackBlur = ({ theme: { fg } }: { theme: DefaultTheme }) => `
  background: ${fg(0.05)};
`;

const trackFocus = ({ theme: { fg } }: { theme: DefaultTheme }) => `
  background: ${fg(0.1)};
`;

const defaultThumbStyles = ({ theme: { fg } }: { theme: DefaultTheme }) => `
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: ${fg()};
`;

const thumbFocusIndicator = ({ theme: { fg } }: { theme: DefaultTheme }) => `
  box-shadow: 0 0 2px 1px ${fg(0.5)};
`;

const SliderImpl = styled.input`
  -webkit-appearance: none;
  outline: none;
  width: ${defaultWidth};
  background: transparent;
  &::-webkit-slider-runnable-track {
    ${defaultTrackStyles}
  }
  &:focus::-webkit-slider-runnable-track {
    ${trackFocus}
  }
  &:not(:focus)::-webkit-slider-runnable-track {
    ${trackBlur}
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -6px;
    ${defaultThumbStyles}
  }
  &:focus::-webkit-slider-thumb {
    ${thumbFocusIndicator}
  }
  &::-moz-range-track {
    ${defaultTrackStyles}
  }
  &::-moz-range-thumb {
    ${defaultThumbStyles}
  }
  &:focus::-moz-range-thumb {
    ${thumbFocusIndicator}
  }
  &:focus::-moz-range-track {
    ${trackFocus}
  }
  &:not(:focus)::-moz-range-track {
    ${trackBlur}
  }
`;

type SliderProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "min" | "max" | "onChange" | "step" | "style" | "value"
>;

const Slider: FC<SliderProps & { children?: undefined }> = (props) => (
  <SliderImpl type="range" {...props} />
);

export default Slider;
