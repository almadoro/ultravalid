import { number } from "@almadoro/uv-core";
import { min } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number> = {
  spec: number.refine(min(2)),
  value: 1,
};

export default test;
