import { symbol, type } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<symbol> = {
  spec: type(symbol),
  value: Symbol.iterator,
};

export default test;
