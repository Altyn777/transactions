import { ceilToCurrencyUnit } from "./rounding.js";

export const getCashInFee = (
  amount,
  { percents, max: { amount: maxAmount, currency } }
) => {
  let fee = amount * (percents / 100);
  fee = ceilToCurrencyUnit(fee, currency);
  return fee > maxAmount ? maxAmount.toFixed(2) : fee.toFixed(2);
};
