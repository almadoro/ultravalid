import { string } from "@almadoro/uv-core";
import { uuid } from "@almadoro/uv-refinements";
import { InvalidTestExports } from "../tests";

const test: InvalidTestExports<string> = {
  spec: string.refine(uuid),
  value: "0bb97d6f-5d89-4286-9b3d-1375bd89b3fx",
};

export default test;
