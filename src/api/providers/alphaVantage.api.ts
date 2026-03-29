import { backendClient } from "../clients/backend.client";

export const alphaVantageApi = {
  searchSymbols: (keyword: string) =>
    backendClient.get("/alpha-vantage/symbol-search", {
      params: { keyword },
    }),
};
