import { string } from "@almadoro/uv-core";
import { email } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(email),
  value: "not-an-email",
};

export default test;
