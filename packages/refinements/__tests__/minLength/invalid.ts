import { string } from "@almadoro/uv-core";
import { minLength } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(minLength(3)),
  value: "12",
};

export default test;
