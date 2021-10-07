import { ReactElement, ReactNode } from "react";
import { APISwitcher } from "../../components/api-switcher";

export default function APIDocLayout(page: ReactElement): ReactNode {
  return (
    <>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <APISwitcher />
      </div>
      {page}
    </>
  );
}
