import { string } from "@almadoro/uv-core";
import { regex } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(regex(/^\D+$/)),
  value: "qwerty",
};

export default test;
