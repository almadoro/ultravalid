import { string } from "@almadoro/uv-core";
import { length } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(length(2)),
  value: "123",
};

export default test;
