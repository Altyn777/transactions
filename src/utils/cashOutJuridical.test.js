import { jest } from "@jest/globals";

jest.unstable_mockModule("./rounding", () => ({
  ceilToCurrencyUnit: jest.fn((it) => it)
}));

const { getCashOutJuridicalFee } = await import("./cashOutJuridical");

describe("getCashOutJuridicalFee", () => {
  it("returns the minimum amount if calculated fee is below minimum", () => {
    expect(
      getCashOutJuridicalFee(100, {
        percents: 0.1,
        min: { amount: 2, currency: "EUR" }
      })
    ).toEqual("2.00");
  });

  it("calculates fee correctly if above minimum", () => {
    expect(
      getCashOutJuridicalFee(1000, {
        percents: 0.3,
        min: { amount: 2, currency: "EUR" }
      })
    ).toEqual("3.00");
  });
});
