import { APIResponse, stockAPI } from ".";
import { SnowflakeItems, SnowflakePElements } from "../types/snowflakeTypes";
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
export interface FilterStocksProps {
  payload: FilterStocksPayload;
  page: number;
}

export interface FilterStocksPayload {
  marketType: "ALL" | "KOSPI" | "KOSDAQ";
  sector?: string[];
  filters: Partial<SnowflakeItems>;
}

export interface FilterStocksData {
  stocks: FilterStock[];
  totalCount: number;
}

export const getFilterStocksAPI = async ({
  payload,
  page,
}: FilterStocksProps): Promise<APIResponse<FilterStocksData>> => {
  const response = await stockAPI.post<APIResponse<FilterStocksData>>(
    `/filter?page=${page}`,
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
  //하드코딩 된 token 추후 변경
  const testToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImM1NTkxZDQ4LWMwMGYtNDdjOC1hNmFiLTAxNmU0MjlhMjVlOSIsInVzZXJuYW1lIjoi64-E7J2AIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE3NDE1ODM5NzIsImV4cCI6MTc0MzM5ODM3Mn0.FILZqWUWa8w-PO1fgTs20bbmz_yRi0Yv-knVYQ1nnUs";
  const config = testToken 
    ? { headers: { Authorization: `Bearer ${testToken}` } } 
    : {};
  const response = await stockAPI.get<APIResponse<StockInfoResponse>>(
    `/${stockId}`,config
  );
  
  return response.data;
};


// 북마크 추가 API 함수
export const addToWatchlist = async (stockId: number): Promise<any> => {
  try {
    //하드코딩 된 token 추후 변경
    const testToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImM1NTkxZDQ4LWMwMGYtNDdjOC1hNmFiLTAxNmU0MjlhMjVlOSIsInVzZXJuYW1lIjoi64-E7J2AIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE3NDE1ODM5NzIsImV4cCI6MTc0MzM5ODM3Mn0.FILZqWUWa8w-PO1fgTs20bbmz_yRi0Yv-knVYQ1nnUs";
    const response = await stockAPI.post(`/${stockId}/watchlist`, null,{
      headers: {
         Authorization: `Bearer ${testToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('관심종목 추가 실패:', error);
    throw error;
  }
};

// 북마크 삭제 API 함수
export const removeFromWatchlist = async (stockId: number): Promise<any> => {
  try {
    //하드코딩 된 token 추후 변경
    const testToken = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6ImM1NTkxZDQ4LWMwMGYtNDdjOC1hNmFiLTAxNmU0MjlhMjVlOSIsInVzZXJuYW1lIjoi64-E7J2AIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpYXQiOjE3NDE1ODM5NzIsImV4cCI6MTc0MzM5ODM3Mn0.FILZqWUWa8w-PO1fgTs20bbmz_yRi0Yv-knVYQ1nnUs";

    const response = await stockAPI.delete(`/${stockId}/watchlist`,{
      headers: {
        Authorization: `Bearer ${testToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('관심종목 삭제 실패:', error);
    throw error;
  }
};

// 임계값 조회
export const getThresholdsAPI = async (): Promise<
  APIResponse<SnowflakePElements>
> => {
  const response =
    await stockAPI.get<APIResponse<SnowflakePElements>>("/thresholds");
  console.log(response.data);

  return response.data;
};
