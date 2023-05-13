import { never, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<{ prop?: never }> = {
  spec: type({ "prop?": never }),
  value: {},
  differentInstance: true,
};

export default test;
