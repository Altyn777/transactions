const ROUNDING_MULTIPLIERS = {
  EUR: 100
};

export const ceilToCurrencyUnit = (amount, currency) => {
  const multiplier = ROUNDING_MULTIPLIERS[currency] || 100;
  return Math.ceil(amount * multiplier) / multiplier;
};
