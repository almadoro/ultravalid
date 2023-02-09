import { number, struct } from "@ultravalid/core";
import { InvalidTestExports } from "../testTypes";

const test: InvalidTestExports = {
  spec: struct({ id: number }),
  value: () => {},
};

export default test;
