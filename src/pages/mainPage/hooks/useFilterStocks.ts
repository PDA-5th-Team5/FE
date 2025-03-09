import { useMutation } from "react-query";
import { getFilterStocksAPI, FilterStocksPayload } from "../../../apis/stock";
import { APIResponse } from "../../../apis";
import { FilterStock } from "../../../types/stockTypes";

export const useFilterStocks = () => {
  return useMutation<APIResponse<FilterStock[]>, Error, FilterStocksPayload>(
    (payload: FilterStocksPayload) => getFilterStocksAPI(payload)
  );
};
