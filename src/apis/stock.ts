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

//댓글 작성
export interface CommentRequest {
  content: string;
}

export const createCommentAPI = async (
  stockId: number,
  content: string
): Promise<APIResponse<null>> => {
  const response = await stockAPI.post<APIResponse<null>>(
    `/${stockId}/comments`,
    content,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'text/plain'
      },
      transformRequest: [(data) => {
        return data;
      }]
    }
  );
  
  return response.data;
};