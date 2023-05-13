import { number } from "@almadoro/uv-core";
import { min } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number> = {
  spec: number.refine(min(2)),
  value: 3,
};

export default test;
