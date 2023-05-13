import { never, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<{ prop?: never }> = {
  spec: type({ "prop?": never }),
  value: { prop: undefined } as any,
  exactOptionalPropertyTypes: false,
  differentInstance: true,
};

export default test;
