import { is, Schema, schema } from "@ultravalid/core";

const spec = schema(
  "customType",
  (v) => typeof v === "string" || "An error message"
);

test("Returns false when validation fails", () => {
  expect(is(123, spec)).toBe(false);
});

test("Throws an Error when schema doesnt yield", () => {
  const spec = new Schema("custom", function* () {});
  expect(() => is(1, spec)).toThrow(Error);
});
