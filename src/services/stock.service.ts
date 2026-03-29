import { alphaVantageApi } from "../api/providers/alphaVantage.api";

export const stockService = {
  async search(keyword: string) {
    const res = await alphaVantageApi.searchSymbols(keyword);
    return res.data?.bestMatches ?? [];
  },
};
