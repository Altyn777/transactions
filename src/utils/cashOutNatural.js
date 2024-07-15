import { ceilToCurrencyUnit } from "./rounding.js";

export const getCashOutNaturalFee = (
  { percents, week_limit },
  total,
  previousFee
) => {
  let fee = 0;
  if (total > week_limit.amount) {
    const excess = total - week_limit.amount;
    fee = (excess * percents) / 100 - previousFee;
    fee = ceilToCurrencyUnit(fee, week_limit.currency);
  }
  return [fee.toFixed(2), fee];
};
