import { number, struct } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<{ id: number }> = {
  spec: struct({ id: number }),
  value: () => {},
};

export default test;
