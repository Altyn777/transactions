import { getCashInFee } from "../utils/cashIn.js";
import { getCashOutJuridicalFee } from "../utils/cashOutJuridical.js";
import { getCashOutNaturalFee } from "../utils/cashOutNatural.js";
import { getEndOfWeek } from "../utils/dateUtils.js";

const TransactionType = {
  CASH_IN: "cash_in",
  CASH_OUT: "cash_out"
};

const UserType = {
  NATURAL: "natural",
  JURIDICAL: "juridical"
};

export function calculateTransactionsFees(
  transactions,
  { cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig }
) {
  let totalWeekAmount = {};
  let previousFees = {};
  let sunday;

  return transactions.map(
    ({ date, user_id, operation: { amount }, type, user_type }) => {
      if (type === TransactionType.CASH_IN) {
        return { fee: getCashInFee(amount, cashInConfig) };
      } else if (user_type === UserType.NATURAL) {
        const transactionDate = new Date(date);
        if (!sunday || transactionDate > sunday) {
          sunday = getEndOfWeek(date);
          totalWeekAmount = { [user_id]: amount };
          previousFees = {};
        } else {
          totalWeekAmount[user_id] = (totalWeekAmount[user_id] || 0) + amount;
        }

        const [roundedFee, fee] = getCashOutNaturalFee(
          cashOutNaturalConfig,
          totalWeekAmount[user_id],
          previousFees[user_id] || 0
        );
        previousFees[user_id] = (previousFees[user_id] || 0) + fee;
        return { fee: roundedFee };
      } else {
        return { fee: getCashOutJuridicalFee(amount, cashOutJuridicalConfig) };
      }
    }
  );
}
