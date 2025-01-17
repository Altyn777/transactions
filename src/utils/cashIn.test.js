import { jest } from "@jest/globals";

jest.unstable_mockModule("./rounding", () => ({
  ceilToCurrencyUnit: jest.fn((it) => it)
}));

const { getCashInFee } = await import("./cashIn");

describe("getCashInFee", () => {
  it("calculates the cash-in fee", () => {
    const amount = 200.0;
    const config = { percents: 0.03, max: { amount: 5, currency: "EUR" } };

    const result = getCashInFee(amount, config);
    expect(result).toEqual("0.06");
  });

  it("applies the maximum limit", () => {
    const amount = 200000;
    const config = { percents: 0.03, max: { amount: 5, currency: "EUR" } };

    const result = getCashInFee(amount, config);
    expect(result).toEqual("5.00");
  });
});
