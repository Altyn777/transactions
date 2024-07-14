import { createApiClient } from "./config";

describe("createApiClient", () => {
  it("fetches configuration successfully from an API", async () => {
    const client = createApiClient();
    const result = await client.fetchConfig("cash-in");
    expect(result).toEqual({
      max: {
        amount: 5,
        currency: "EUR"
      },
      percents: 0.03
    });
  });
});
