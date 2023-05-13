import { symbol, type } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<symbol> = {
  spec: type(symbol),
  value: "@@iterator",
};

export default test;
