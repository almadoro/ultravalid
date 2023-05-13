import { any, record, string } from "@almadoro/uv-core";
import { ValidTestExports } from "../tests";

const test: ValidTestExports<Record<string, any>> = {
  spec: record(string, any),
  value: { prop: 1 },
  differentInstance: true,
};

export default test;
