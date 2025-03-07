import { stockAPI } from ".";

export const autocompleteAPI = async () => {
  const response = await stockAPI.get("/search?keyword=0");
  return response.data.data.stocks;
};
