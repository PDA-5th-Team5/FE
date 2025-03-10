import { APIResponse, stockAPI } from ".";
import { SnowflakeItems } from "../types/snowflakeTypes";
import { FilterStock } from "../types/stockTypes";

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

// 댓글 조회 API
export interface Comment {
  commentId: number;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  stockId: number;
  userId: string;
}

export interface CommentsResponse {
  commentCnt: number;
  comments: Comment[];
}

export const getCommentsAPI = async (
  stockId: number,
  page: number = 1,
  size: number = 10
): Promise<CommentsResponse> => {
  const response = await stockAPI.get<APIResponse<CommentsResponse>>(
    `/${stockId}/comments?page=${page}&size=${size}`
  );
  
  // API 응답 형식에 맞게 데이터 변환
  return {
    commentCnt: response.data.data.commentCnt,
    comments: response.data.data.comments
  };
};

// 댓글 삭제 API
export const deleteCommentAPI = async (
  stockId: number,
  commentId: number
): Promise<APIResponse<null>> => {
  const response = await stockAPI.delete<APIResponse<null>>(
    `/${stockId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
  
  return response.data;
};

//댓글 수정
export interface CommentRequest {
  content: string;
}

export const editCommentAPI = async (
  stockId: number,
  commentId : number,
  content: string
): Promise<APIResponse<null>> => {
  const response = await stockAPI.patch<APIResponse<null>>(
    `/${stockId}/comments/${commentId}`,
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


// 전체 섹터 조회 API 연결
export const getSectorsAPI = async (): Promise<APIResponse<string[]>> => {
  const response = await stockAPI.get<APIResponse<string[]>>("/sectors");
  return response.data;
};

// 조건 검색 결과 조회
export interface FilterStocksPayload {
  marketType: "ALL" | "KOSPI" | "KOSDAQ";
  sector?: string[];
  filters: Partial<SnowflakeItems>;
}

export const getFilterStocksAPI = async (
  payload: FilterStocksPayload
): Promise<APIResponse<FilterStock[]>> => {
  const response = await stockAPI.post<APIResponse<FilterStock[]>>(
    "/filter",
    payload
  );
  return response.data;
};


//개별종목정보조회
export interface StockInfoResponse {
  stockInfo: {
    stockId: number;
    ticker: string;
    marketCap: string;
    companyName: string;
    marketType: string;
    currentPrice: number;
    changeRate: number;
    weekRateChange: number;
    yearRateChange: number;
    sector: string;
    companyOverview: string;
    fav: boolean;
    eps: number;
    bps: number;
    pbr: number;
  };
  snowflakeS: {
    per: number;
    lbltRate: number;
    marketCap: number;
    dividendYield: number;
    foreignerRatio: number;
  };
}
// 개별종목정보조회 API 함수
export const getStockInfo = async (
  stockId: number
): Promise<APIResponse<StockInfoResponse>> => {
  const response = await stockAPI.get<APIResponse<StockInfoResponse>>(
    `/${stockId}`
  );
  
  return response.data;
};