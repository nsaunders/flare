import { FC } from "react";

export type Flare<A> = {
  _tag: "Flare";
  make: () => {
    query: () => A;
    render: FC<{ onChange: () => void; children?: undefined }>;
  };
};
