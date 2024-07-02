export const getEndOfWeek = (date) => {
  const transactionDate = new Date(date);
  transactionDate.setUTCHours(0, 0, 0, 0);
  const dayOfWeek = transactionDate.getUTCDay();
  const daysToAdd = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  const endOfWeek = new Date(
    transactionDate.setUTCDate(transactionDate.getUTCDate() + daysToAdd)
  );
  endOfWeek.setUTCHours(23, 59, 59, 999);
  return endOfWeek;
};
