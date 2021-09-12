import * as F from "./lib";
import { match } from "./match";

describe("match", () => {
  it("returns the flare corresponding to the provided value", () => {
    const flare1 = F.of("A");
    const flare2 = F.of("B");
    const flare3 = F.of(3);

    const match_ = match({
      1: flare1,
      two: flare2,
      3: flare3,
    });

    expect(match_(1)).toEqual(flare1);
    expect(match_("two")).toEqual(flare2);
    expect(match_(3)).toEqual(flare3);
  });
});
