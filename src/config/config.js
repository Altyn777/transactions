import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL =
  process.env.API_BASE_URL || "https://developers.paysera.com/tasks/api";

const validateStatus = (status) => {
  if (status >= 200 && status < 300) {
    return true;
  }
  throw new Error(`Request failed with status code: ${status}`);
};

export function createApiClient(baseURL = BASE_URL) {
  const instance = axios.create({
    baseURL,
    validateStatus
  });
  return {
    async fetchConfig(key) {
      try {
        const response = await instance.get(`/${key}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };
}
