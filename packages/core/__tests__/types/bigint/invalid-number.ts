import { bigint, type } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: type(bigint),
  value: 42,
};

export default test;
