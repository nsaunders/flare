import { css } from "demitasse";
import { FC } from "react";

export const styles = /*#__PURE__*/ css({
  paddingTop: 8,
  paddingRight: 16,
  paddingBottom: 8,
  paddingLeft: 16,
  fontFamily: "Lato",
  fontSize: 16,
  "& > h1:first-child": {
    marginTop: 0,
  },
  "& hr + h2:not([class])": {
    marginTop: -8,
  },
  "& hr:not([class])": {
    height: 0,
    border: "none",
    borderBottom: "1px solid rgba(var(--light),0.05)",
    marginTop: 24,
    marginBottom: 24,
  },
  "& p:not([class])": {
    lineHeight: 1.5,
  },
  "& a:not([class])": {
    "&:link,&:visited": {
      color: "rgba(var(--light), 0.75)",
    },
    "&:hover,&:focus,&:active": {
      color: "inherit",
    },
  },
  "& code": {
    fontFamily: "'Courier Prime'",
  },
  "& table th, & table td": {
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 2,
    paddingLeft: 8,
  },
  "& table": {
    marginTop: -2,
    marginRight: -8,
    marginBottom: -2,
    marginLeft: -8,
  },
});

export const Doc: FC<unknown> = ({ children }) => (
  <div className={styles}>{children}</div>
);
