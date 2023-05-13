import { number, string, tuple } from "@almadoro/uv-core";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<[string, number, number]> = {
  spec: tuple(string, number, number),
  value: ["str", 1, 2, "3"],
  error: {
    branch: [["str", 1, 2, "3"], "3"],
    path: ["3"],
    types: ["tuple", "never"],
  },
};

export default test;
