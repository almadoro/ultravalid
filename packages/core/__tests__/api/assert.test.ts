import { assert, Schema, schema, ValidationError } from "@ultravalid/core";

const spec = schema("custom", (v) => typeof v === "string" || "Error message");

test("Throws a ValidationError when validation fails", () => {
  expect(() => assert(1, spec)).toThrow(ValidationError);
});

test("Does not throw when validation succeeds", () => {
  expect(() => assert("1", spec)).not.toThrow(ValidationError);
});

test("Throws an Error when schema doesnt yield", () => {
  const spec = new Schema("custom", function* () {});
  expect(() => assert(1, spec)).toThrow(Error);
});
