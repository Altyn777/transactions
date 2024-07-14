import { createApiClient } from "../config/config.js";

const apiClient = createApiClient();

export const loadConfigurations = async () => {
  try {
    const [cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig] =
      await Promise.all([
        apiClient.fetchConfig("cash-in"),
        apiClient.fetchConfig("cash-out-natural"),
        apiClient.fetchConfig("cash-out-juridical")
      ]);
    return { cashInConfig, cashOutNaturalConfig, cashOutJuridicalConfig };
  } catch (error) {
    throw new Error("Configuration loading failed");
  }
};
