import { number } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number> = {
  spec: number,
  value: "42",
};

export default test;
