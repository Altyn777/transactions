import { fileURLToPath } from "url";
import { dirname } from "path";

import { loadConfigurations } from "./api/cashApiConfig.js";
import { logError } from "./utils/logger.js";
import { readTransactions } from "./utils/fileReader.js";
import { calculateTransactionsFees } from "./controllers/transactionController.js";

export const main = async (filePath) => {
  try {
    const configs = await loadConfigurations();
    const transactions = await readTransactions(filePath);
    const fees = calculateTransactionsFees(transactions, configs);
    fees.map(({ fee }) => console.log(fee));
  } catch (error) {
    logError(error);
  }
};

const filePath = process.argv[2];

const currentModulePath = dirname(fileURLToPath(import.meta.url));

const mainModulePath = dirname(process.argv[1]);

if (currentModulePath === mainModulePath) {
  main(filePath).catch(logError);
}
