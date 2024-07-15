import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { readTransactions } from "./fileReader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("readTransactions", () => {
  const testDataPath = path.join(__dirname, "testData.json");
  const testOutput = [{ id: 1, amount: 100 }];

  beforeAll(() => {
    fs.writeFileSync(testDataPath, JSON.stringify(testOutput));
  });

  afterAll(() => {
    fs.unlinkSync(testDataPath);
  });

  it("successfully reads and parses JSON data from file", async () => {
    const result = await readTransactions(testDataPath);
    expect(result).toEqual(testOutput);
  });

  it("throws an error when file is not found", async () => {
    await expect(readTransactions("path/to/nonexistent.json")).rejects.toThrow(
      "Failed to read transactions file."
    );
  });

  it("throws an error when data is not valid JSON", async () => {
    const invalidDataPath = path.join(__dirname, "invalidData.json");
    fs.writeFileSync(invalidDataPath, "invalid json");

    await expect(readTransactions(invalidDataPath)).rejects.toThrow(
      "Failed to parse transactions data as JSON."
    );

    fs.unlinkSync(invalidDataPath);
  });
});
