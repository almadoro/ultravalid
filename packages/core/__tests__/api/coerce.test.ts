import {
  assert,
  coercion,
  number,
  string,
  ValidationError,
} from "@almadoro/uv-core";

const numToStr = coercion(number, (v) => v.toString());
const strNum = string.coerce(numToStr);

test("string schema fails with number", () => {
  expect(() => assert(1, string)).toThrow(ValidationError);
});

test("string schema with number coercion does not fail", () => {
  expect(() => assert(1, strNum)).not.toThrow(ValidationError);
});

test("string schema with number coercion fails for other input type", () => {
  expect(() => assert(false, strNum)).toThrow(Error);
});
