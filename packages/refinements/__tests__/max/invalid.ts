import { number } from "@almadoro/uv-core";
import { max } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number> = {
  spec: number.refine(max(2)),
  value: 3,
};

export default test;
