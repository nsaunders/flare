import { ComponentProps, ReactNode } from "react";
import SmartHead from "./SmartHead";
import DocBase from "./DocBase";

export default function Doc({
  children,
  ...meta
}: { children?: ReactNode } & ComponentProps<typeof SmartHead>) {
  return (
    <>
      <SmartHead {...meta} />
      <DocBase>{children}</DocBase>
    </>
  );
}
