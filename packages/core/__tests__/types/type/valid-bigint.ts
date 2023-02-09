import { bigint, type } from "@ultravalid/core";
import { ValidTestExports } from "../testTypes";

const test: ValidTestExports<bigint> = {
  spec: type(bigint),
  value: BigInt(42),
};

export default test;
