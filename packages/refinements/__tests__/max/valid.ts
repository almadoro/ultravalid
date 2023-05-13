import { number } from "@almadoro/uv-core";
import { max } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number> = {
  spec: number.refine(max(2)),
  value: 1,
};

export default test;
