import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div<{ active: boolean }>`
  display: inline-flex;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { fg } }) => fg()};
  border-radius: 4px;
  padding-right: 0;
  padding-left: 7px;
  &:focus-within {
    box-shadow: ${({ theme: { fg } }) => `0 0 0.166em 0.083em ${fg(0.5)}`};
  }
  ${({ active, theme: { fg, bg } }) =>
    active &&
    `
    background: ${fg()};
    color: ${bg()};
  `}
`;

const ButtonWrap = styled.div`
  margin-right: 8px;
  padding-top: 6px;
`;

const Button = styled.button`
  appearance: none;
  outline: none;
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  color: inherit;
`;

const MainTextWrap = styled.div`
  flex: 1;
  font-family: "Courier Prime";
  font-size: 16px;
  line-height: 1;
  height: 30px;
  overflow: hidden;
`;

const MainText = styled.div<{ scrolled: boolean }>`
  position: relative;
  top: 0;
  transition-property: top;
  transition-duration: 0.5s;
  ${({ scrolled }) => scrolled && "top: -30px;"}
`;

const MainTextItem = styled.div<{ inactive?: boolean }>`
  padding-top: 8px;
  padding-bottom: 6px;
  transition-property: opacity;
  transition-duration: 0.5s;
  ${({ inactive }) => inactive && "opacity: 0;"}
`;

const SpinnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const Spinner = styled.button`
  flex: 1;
  display: flex;
  align-items: flex-end;
  appearance: none;
  outline: none;
  margin: 0;
  padding-top: 2px;
  padding-right: 8px;
  padding-bottom: 2px;
  padding-left: 8px;
  border: 0;
  background: transparent;
  color: inherit;
  & + & {
    align-items: flex-start;
  }
`;

type InstallProps = {
  packageName: string;
};

export default function Install({ packageName }: InstallProps) {
  const [packageManager, setPackageManager] = useState<"npm" | "yarn">("npm");
  const copyButtonEl = useRef<HTMLButtonElement>(null);
  const [mousePressed, setMousePressed] = useState(false);
  const [spacebarPressed, setSpacebarPressed] = useState(false);
  const active = spacebarPressed || mousePressed;
  return (
    <Container
      active={active}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowUp":
            if (packageManager === "yarn") {
              setPackageManager("npm");
            }
            e.preventDefault();
            break;
          case "ArrowDown":
            if (packageManager === "npm") {
              setPackageManager("yarn");
            }
            e.preventDefault();
            break;
          case " ":
            setSpacebarPressed(true);
            break;
          default:
            break;
        }
      }}
      onKeyUp={() => {
        setSpacebarPressed(false);
      }}
    >
      <ButtonWrap>
        <Button
          ref={copyButtonEl}
          onMouseDown={() => {
            setMousePressed(true);
          }}
          onMouseUp={() => {
            if (mousePressed) {
              copyToClipboard(
                `${
                  packageManager === "yarn" ? "yarn add" : "npm install"
                } ${packageName}`,
              );
            }
            setMousePressed(false);
            copyButtonEl.current?.focus();
          }}
          onMouseOut={() => {
            setMousePressed(false);
          }}
          onKeyUp={() => {
            if (spacebarPressed) {
              copyToClipboard(
                `${
                  packageManager === "yarn" ? "yarn add" : "npm install"
                } ${packageName}`,
              );
            }
            copyButtonEl.current?.focus();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </ButtonWrap>
      <MainTextWrap>
        <MainText scrolled={packageManager === "yarn"}>
          <MainTextItem inactive={packageManager !== "npm"}>
            npm install {packageName}
          </MainTextItem>
          <MainTextItem inactive={packageManager !== "yarn"}>
            yarn add {packageName}
          </MainTextItem>
        </MainText>
      </MainTextWrap>
      <SpinnerWrap>
        <Spinner
          tabIndex={-1}
          onClick={() => {
            if (packageManager !== "npm") {
              setPackageManager("npm");
            }
            copyButtonEl.current?.focus();
          }}
        >
          <svg viewBox="0 0 8 4" width="8" height="4">
            <path d="M0,4 l4,-4 l4,4 h-2 l-2,-2 l-2,2" fill="currentColor" />
          </svg>
        </Spinner>
        <Spinner
          tabIndex={-1}
          onClick={() => {
            if (packageManager !== "yarn") {
              setPackageManager("yarn");
            }
            copyButtonEl.current?.focus();
          }}
        >
          <svg viewBox="0 0 8 4" width="8" height="4">
            <path d="M0,0 l4,4 l4,-4 h-2 l-2,2 l-2,-2" fill="currentColor" />
          </svg>
        </Spinner>
      </SpinnerWrap>
    </Container>
  );
}

function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
