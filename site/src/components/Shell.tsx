import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import styled, { useTheme } from "styled-components";
import Button from "./Button";
import Install from "./Install";
import MenuIcon from "./MenuIcon";
import MenuOpenIcon from "./MenuOpenIcon";
import { useModeToggle } from "./Mode";

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme: { bg } }) => bg()};
  color: ${({ theme: { fg } }) => fg()};
`;

const MainColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MenuDrawer = styled.div<{ open?: boolean }>`
  display: flex;
  width: ${({ open }) => (open ? "200px" : "0")};
  overflow-x: hidden;
  overflow-y: auto;
  white-space: nowrap;
  direction: rtl;
  > * {
    width: 200px;
    direction: ltr;
  }
  background: ${(props) => props.theme.fg(0.05)};
  transition-property: width;
  transition-duration: 250ms;
`;

const MenuLinkContent = styled.a<{ active: boolean }>`
  width: 100%;
  font-family: "Lato";
  font-size: 16px;
  text-decoration: none;
  color: ${({ active, theme: { fg } }) => fg(active ? undefined : 0.5)};
  background: ${({ active, theme: { bg } }) =>
    active ? bg(0.5) : "transparent"};
  display: inline-block;
  padding: 8px 16px;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  outline: none;
  &:focus {
    text-decoration: ${({ active }) => (active ? "none" : "underline")};
  }
`;

function MenuLink({ href, children }: { href: string; children: string }) {
  const { pathname } = useRouter();
  return (
    <Link legacyBehavior href={href}>
      <MenuLinkContent href="" active={pathname.startsWith(href)}>
        {children}
      </MenuLinkContent>
    </Link>
  );
}

function Menu() {
  return (
    <nav>
      <ul
        style={{ margin: 0, marginTop: 8, padding: 0, listStyleType: "none" }}
      >
        <li>
          <MenuLink href="/getting-started">Getting Started</MenuLink>
        </li>
        <li>
          <MenuLink href="/examples">Examples</MenuLink>
        </li>
      </ul>
    </nav>
  );
}

const AppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-basis: 78px;
  flex-shrink: 0;
  margin: 0 20px;
`;

const Logo = styled.h1<{ marker?: boolean; size?: 48 | 64 }>`
  margin: 0;
  font-family: "Gruppo";
  font-size: ${({ size = 48 }) => size}px;
  line-height: 1;
  letter-spacing: 0.5em;
  transform: translateX(0.25em);
  text-transform: uppercase;
  color: ${({ theme: { fg } }) => fg()};
  ${({ marker }) => marker && "visibility: hidden;"}
`;

function AppBarContent({
  menuOpen,
  onToggleMenu,
  onLogoMarker,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onLogoMarker: (marker: HTMLHeadingElement) => void;
}) {
  const { ToggleIcon: ModeToggleIcon } = useTheme();
  const onToggleMode = useModeToggle();
  return (
    <>
      <Button
        motif="tertiary"
        style={{ width: 36, height: 36, borderRadius: 9999 }}
        icon={menuOpen ? MenuOpenIcon : MenuIcon}
        onClick={onToggleMenu}
      />
      <Logo ref={onLogoMarker} size={48} marker>
        Flare
      </Logo>
      <Button
        motif="tertiary"
        style={{ width: 36, height: 36, borderRadius: 9999 }}
        icon={ModeToggleIcon}
        onClick={onToggleMode}
      />
    </>
  );
}

const Main = styled.div`
  overflow-y: auto;
  flex: 1;
  position: relative;
`;

const IntroWrap = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transition-property: opacity, visibility;
  transition-duration: 250ms;
  transition-delay: ${({ visible }) => (visible ? "250ms" : 0)};
`;

const Description = styled.h2`
  margin: 0;
  font-family: "Lato";
  font-size: 14px;
  letter-spacing: 0.21em;
  color: ${({ theme: { fg } }) => fg()};
`;

function Intro({
  visible,
  onLogoMarker,
}: {
  visible: boolean;
  onLogoMarker: (marker: HTMLHeadingElement) => void;
}) {
  return (
    <IntroWrap visible={visible}>
      <Logo ref={onLogoMarker} marker size={64}>
        Flare
      </Logo>
      <Description>Applicative-style UIs in TypeScript</Description>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link legacyBehavior href="/getting-started">
          <Button
            motif="primary"
            size="large"
            grow
            as="a"
            style={{ cursor: "pointer" }}
          >
            Get started
          </Button>
        </Link>
        <Install packageName="flare" />
      </div>
    </IntroWrap>
  );
}

const useToggle = () => useReducer((x) => !x, false);

export default function Shell({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const isDefaultRoute = router.pathname === "/";

  const [headingLogoMarker, setHeadingLogoMarker] =
    useState<HTMLHeadingElement | null>(null);
  const [introLogoMarker, setIntroLogoMarker] =
    useState<HTMLHeadingElement | null>(null);
  const [menuOpen, toggleMenu] = useToggle();

  useEffect(() => {
    const listener = () => {
      menuOpen && toggleMenu();
    };
    router.events.on("routeChangeStart", listener);
    return () => {
      router.events.off("routeChangeStart", listener);
    };
  }, [menuOpen, toggleMenu, router]);

  return (
    <Layout>
      <MenuDrawer open={menuOpen}>
        <Menu />
      </MenuDrawer>
      <MainColumn style={{ position: "relative" }}>
        <AppBar>
          <AppBarContent
            menuOpen={menuOpen}
            onToggleMenu={toggleMenu}
            onLogoMarker={setHeadingLogoMarker}
          />
        </AppBar>
        <Main>
          {children}
          <Intro visible={isDefaultRoute} onLogoMarker={setIntroLogoMarker} />
        </Main>
        <Logo
          size={isDefaultRoute ? 64 : 48}
          style={{
            textAlign: "center",
            position: "absolute",
            top:
              (isDefaultRoute
                ? introLogoMarker
                : headingLogoMarker
              )?.getBoundingClientRect?.()?.top || 0,
            right: 64,
            left: 64,
            transitionProperty: "top,font-size",
            transitionDuration: "250ms",
            transitionDelay: isDefaultRoute ? "250ms" : "0",
          }}
        >
          {useMemo(() => {
            if (isDefaultRoute) {
              return "Flare";
            }
            return (
              <Link
                href="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Flare
              </Link>
            );
          }, [isDefaultRoute])}
        </Logo>
      </MainColumn>
    </Layout>
  );
}
