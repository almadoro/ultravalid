import { number } from "@almadoro/uv-core";
import { int } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<number> = {
  spec: number.refine(int),
  value: 123,
};

export default test;
