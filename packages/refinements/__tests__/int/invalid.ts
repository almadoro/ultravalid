import { number } from "@almadoro/uv-core";
import { int } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number> = {
  spec: number.refine(int),
  value: 123.456,
};

export default test;
