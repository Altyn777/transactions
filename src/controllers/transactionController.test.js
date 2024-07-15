import { jest } from "@jest/globals";

jest.unstable_mockModule("../utils/cashIn", () => ({
  getCashInFee: jest.fn(() => "0.06")
}));
jest.unstable_mockModule("../utils/cashOutJuridical", () => ({
  getCashOutJuridicalFee: jest.fn(() => "0.90")
}));
jest.unstable_mockModule("../utils/cashOutNatural", () => ({
  getCashOutNaturalFee: jest.fn(() => ["0.30", 0.3])
}));

const { calculateTransactionsFees } = await import("./transactionController");
const { getCashOutNaturalFee } = await import("../utils/cashOutNatural");

describe("calculateTransactionsFees", () => {
  const cashInConfig = { percents: 0.03, max: { amount: 5, currency: "EUR" } };
  const cashOutNaturalConfig = { feePercentage: 0.3, weeklyLimit: 1000 };
  const cashOutJuridicalConfig = { feePercentage: 0.3, minFee: 0.5 };

  it("calculates cash in fee correctly", () => {
    const transactions = [
      {
        date: "2022-01-01",
        user_id: 1,
        operation: { amount: 200 },
        type: "cash_in",
        user_type: "natural"
      }
    ];

    const fees = calculateTransactionsFees(transactions, {
      cashInConfig,
      cashOutNaturalConfig,
      cashOutJuridicalConfig
    });

    expect(fees[0].fee).toEqual("0.06");
  });

  it("calculates cash out fee for juridical users correctly", () => {
    const transactions = [
      {
        date: "2022-01-02",
        user_id: 2,
        operation: { amount: 300 },
        type: "cash_out",
        user_type: "juridical"
      }
    ];

    const fees = calculateTransactionsFees(transactions, {
      cashInConfig,
      cashOutNaturalConfig,
      cashOutJuridicalConfig
    });

    expect(fees[0].fee).toEqual("0.90");
  });

  it("calculates cash out fee for natural users correctly", () => {
    const transactions = [
      {
        date: "2022-07-01",
        user_id: 1,
        operation: { amount: 300 },
        type: "cash_out",
        user_type: "natural"
      },
      {
        date: "2022-07-02",
        user_id: 1,
        operation: { amount: 500 },
        type: "cash_out",
        user_type: "natural"
      }
    ];
    const config = {
      cashInConfig: { percentage: 0.03, max: { amount: 5, currency: "EUR" } },
      cashOutNaturalConfig: { percentage: 0.3, weeklyLimit: 1000 },
      cashOutJuridicalConfig: { percentage: 0.3, minFee: 0.5 }
    };

    calculateTransactionsFees(transactions, config);

    expect(getCashOutNaturalFee).toHaveBeenNthCalledWith(
      1,
      config.cashOutNaturalConfig,
      300,
      0
    );

    expect(getCashOutNaturalFee).toHaveBeenNthCalledWith(
      2,
      config.cashOutNaturalConfig,
      800,
      0.3
    );
  });
});
