import { type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<typeof NaN> = {
  spec: type(NaN),
  value: NaN,
};

export default test;
