import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 4px;
  position: relative;
  display: inline-flex;
  width: 100%;
  max-width: 500px;
  font-family: "Lato";
  font-size: 14px;
  background-color: ${({ theme: { fg } }) => fg(0.05)};
`;

const Marker = styled.div<{ position: "left" | "center" | "right" }>`
  position: absolute;
  border-radius: 3px;
  width: calc(100% / 3 - 2px);
  top: 2px;
  bottom: 2px;
  background-color: ${({ theme: { bg } }) => bg(0.5)};
  transition-property: left;
  transition-duration: 125ms;
  left: ${({ position }) =>
    ({ left: "2px", center: "calc(100% / 3 + 1px)", right: "calc(200% / 3)" }[
      position
    ])};
`;

const Item = styled.div<{ selected: boolean }>`
  cursor: pointer;
  margin: 0;
  appearance: none;
  background: transparent;
  color: ${({ selected, theme: { fg } }) => (selected ? fg() : fg(0.5))};
  border: none;
  outline: none;
  font: inherit;
  z-index: 1;
  flex: 1;
  text-align: center;
  padding: 8px;
  transition-property: color;
  transition-duration: 125ms;
  &:not(:focus) {
    text-decoration: none;
  }
`;

export default function APISwitcher() {
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
    <Container>
      <Marker
        position={
          ({ "/flare": "center", "/flare-core": "right" } as const)[selected] ||
          "left"
        }
      />
      {routes.map(([path, name]) => (
        <Link legacyBehavior href={`/api-docs${path}`} key={name}>
          <a style={{ textDecoration: "none", display: "contents" }}>
            <Item selected={path === selected}>{name}</Item>
          </a>
        </Link>
      ))}
    </Container>
  );
}
