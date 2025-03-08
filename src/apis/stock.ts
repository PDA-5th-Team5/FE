import { APIResponse, stockAPI } from ".";

// 1) 개별 종목 검색 (자동완성)
export interface AutocompleteStock {
  id: number;
  ticker: string;
  companyName: string;
}

export const autocompleteAPI = async (
  keyword: string
): Promise<AutocompleteStock[]> => {
  const response = await stockAPI.get<APIResponse<AutocompleteStock[]>>(
    `/search?keyword=${keyword}`
  );
  const stocks = response.data.data;
  return Array.isArray(stocks) ? stocks : [];
};
