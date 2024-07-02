import fs from "fs";
import { once } from "events";

export const readTransactions = async (filePath) => {
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  let data = "";

  stream.on("data", (chunk) => {
    data += chunk;
  });

  try {
    await once(stream, "end");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("Failed to read transactions file.");
    } else if (error instanceof SyntaxError) {
      throw new Error("Failed to parse transactions data as JSON.");
    } else {
      throw error;
    }
  }
};
