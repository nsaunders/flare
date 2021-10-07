import { ReactElement, ReactNode } from "react";
import APISwitcher from "./api-switcher";
import APIDoc from "./api-doc";

export default function APIDocLayout(page: ReactElement): ReactNode {
  return (
    <APIDoc>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <APISwitcher />
      </div>
      {page}
    </APIDoc>
  );
}
