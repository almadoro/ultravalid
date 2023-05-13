import { string } from "@almadoro/uv-core";
import { email } from "@almadoro/uv-refinements";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<string> = {
  spec: string.refine(email),
  value: "email@domain.com",
};

export default test;
