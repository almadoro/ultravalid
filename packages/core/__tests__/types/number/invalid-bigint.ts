import { number } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number> = {
  spec: number,
  value: BigInt(42),
};

export default test;
