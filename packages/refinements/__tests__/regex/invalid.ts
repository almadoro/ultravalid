import { string } from "@almadoro/uv-core";
import { regex } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(regex(/^\D+$/)),
  value: "asd123",
};

export default test;
