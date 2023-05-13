import { type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<typeof NaN> = {
  spec: type(NaN),
  value: NaN,
};

export default test;
