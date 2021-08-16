import { Flare } from "./common";

type MatchFn<O> = O extends Record<string | number, Flare<infer A>>
  ? (k: keyof O) => Flare<A>
  : never;

export const match = <O>(o: O): MatchFn<O> =>
  ((k: keyof O) => o[k]) as unknown as MatchFn<O>;
