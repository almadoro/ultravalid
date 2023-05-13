import { array, number } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<number[]> = {
  spec: array(number),
  value: [123, 98, "456"],
  error: {
    branch: [[123, 98, "456"], "456"],
    path: ["2"],
    types: ["array", "number"],
  },
};

export default test;
