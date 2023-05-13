import { type, unknown } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<unknown> = {
  spec: type(unknown),
  value: 1,
};

export default test;
