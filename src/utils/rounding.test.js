import { ceilToCurrencyUnit } from "./rounding";

describe("ceilToCurrencyUnit", () => {
  it("correctly rounds up to the nearest cent for EUR", () => {
    const result = ceilToCurrencyUnit(10.125, "EUR");
    expect(result).toBe(10.13);
  });
  it("correctly rounds up to the nearest cent for USD", () => {
    const result = ceilToCurrencyUnit(10.125, "USD");
    expect(result).toBe(10.13);
  });
});
