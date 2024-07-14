import { getEndOfWeek } from "./dateUtils.js";

describe("getEndOfWeek", () => {
  it("should return the end of the week for a given date", () => {
    const date = "2024-06-24T00:00:00Z";
    const result = getEndOfWeek(date);
    const expected = new Date("2024-06-30T23:59:59.999Z");
    expect(result).toEqual(expected);
  });

  it("should handle dates already at the end of the week", () => {
    const date = "2024-06-30T00:00:00Z";
    const result = getEndOfWeek(date);
    const expected = new Date("2024-06-30T23:59:59.999Z");
    expect(result).toEqual(expected);
  });

  it("should handle year change correctly", () => {
    const date = "2023-12-28T00:00:00Z";
    const result = getEndOfWeek(date);
    const expected = new Date("2023-12-31T23:59:59.999Z");
    expect(result).toEqual(expected);
  });
});
