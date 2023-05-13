import { type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<undefined> = {
  spec: type(undefined),
  value: undefined,
};

export default test;
