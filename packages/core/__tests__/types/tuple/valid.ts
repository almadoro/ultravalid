import { array, number, string, tuple } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<["const", string, number, string[]]> = {
  spec: tuple("const", string, number, array(string)),
  value: ["const", "str", 123, ["asd"]],
  differentInstance: true,
};

export default test;
