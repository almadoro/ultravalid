import { bigint, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<bigint> = {
  spec: type(bigint),
  value: BigInt(42),
};

export default test;
