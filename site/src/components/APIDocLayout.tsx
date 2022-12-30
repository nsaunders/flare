import { ReactElement } from "react";
import APISwitcher from "./APISwitcher";
import DocBase from "./DocBase";

export default function APIDocLayout(page: ReactElement) {
  return (
    <DocBase>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <APISwitcher />
      </div>
      {page}
    </DocBase>
  );
}
