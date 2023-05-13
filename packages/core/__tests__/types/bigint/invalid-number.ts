import { bigint, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<bigint> = {
  spec: type(bigint),
  value: 42,
};

export default test;
