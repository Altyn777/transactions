import { ceilToCurrencyUnit } from "./rounding.js";

export const getCashOutJuridicalFee = (amount, { percents, min }) => {
  let fee = amount * (percents / 100);
  fee = ceilToCurrencyUnit(fee, min.currency);
  return fee < min.amount ? min.amount.toFixed(2) : fee.toFixed(2);
};
