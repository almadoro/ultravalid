import { string } from "@almadoro/uv-core";
import { email } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string, boolean> = {
  spec: string.refine(email),
  value: true,
};

export default test;
