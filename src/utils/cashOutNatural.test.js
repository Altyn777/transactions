import { getCashOutNaturalFee } from "./cashOutNatural.js";
import { jest } from "@jest/globals";
jest.mock("./rounding.js", () => ({
  ceilToCurrencyUnit: jest.fn((amount) => amount)
}));

describe("getCashOutNaturalFee", () => {
  it("returns zero fee and zero array when total is below the week limit", () => {
    const config = {
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: "EUR"
      }
    };
    const total = 500;
    const previousFee = 0;

    const result = getCashOutNaturalFee(config, total, previousFee);
    expect(result).toEqual(["0.00", 0]);
  });

  it("calculates fee correctly when total exceeds the week limit", () => {
    const config = {
      percents: 0.3,
      week_limit: {
        amount: 1000,
        currency: "EUR"
      }
    };
    const total = 1500;
    const previousFee = 50;
    const expectedFee = (500 * 0.3) / 100 - 50;

    const result = getCashOutNaturalFee(config, total, previousFee);
    expect(result[0]).toEqual(expectedFee.toFixed(2));
    expect(result[1]).toEqual(expectedFee);
  });
});
