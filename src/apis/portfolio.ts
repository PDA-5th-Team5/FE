import { APIResponse, portfolioAPI } from ".";
import { PortfolioDetail, MyPortfolioResponse } from "../types/portfolioTypes";
import { SnowflakeItems } from "../types/snowflakeTypes";
// 1) 인기 포트폴리오 조회 & 전문가 포트폴리오 조회
export interface RecommededPortfolio {
  sharePortfolioId: number;
  loadCount: number;
  createdAt: string;
  portfolio: PortfolioDetail;
}

export const recommededPortfolioAPI = async (
  activeTab: string
): Promise<RecommededPortfolio[]> => {
  const response = await portfolioAPI.get<APIResponse<RecommededPortfolio[]>>(
    `/${activeTab}`
  );

  return response.data.data;
};

// 2) 나의 포트폴리오 저장
export interface SaveMyPortfolio extends SnowflakeItems {
  category: string;
  title: string;
  description: string;
  market: string;
  sector: string[];
}

export const saveMyPortfolioAPI = async (payload: SaveMyPortfolio) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인 해주세요!");
  }

  const response = await portfolioAPI.post("/my/save", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

//공유포폴리스트조회
export interface RangeValue {
  min: number;
  max: number;
}
export interface SharePortfolioItem {
  sharePortfolioId: number;
  loadCount: number;
  createdAt: string;
  portfolio: {
    id: string;
    title: string;
    description?: string;
    category: string;
    portfolioId: number;
    market?: string;
    sector?: string[];

    marketCap?: RangeValue;
    per?: RangeValue;
    eps?: RangeValue;
    bps?: RangeValue;
    pbr?: RangeValue;
    dividendYield?: RangeValue;
    foreignerRatio?: RangeValue;
    sps?: RangeValue;
    saleAccount?: RangeValue;
    crntRate?: RangeValue;
    lbltRate?: RangeValue;
    ntinInrt?: RangeValue;
    bsopPrfiInrt?: RangeValue;
    grs?: RangeValue;
    roeVal?: RangeValue;
    bsopPrti?: RangeValue;
    thtrNtin?: RangeValue;
  };
}

export const sharePortfolioListAPI = async (
  sortBy: string = "loadCount"
): Promise<FilterStock[]> => {
  const response = await portfolioAPI.get<APIResponse<FilterStock[]>>(
    `/share/board?page=0&sortBy=${sortBy}`
  );
  return response.data.data;
};

// 나의 포트폴리오 리스트 조회 API
export const myPortfolioListAPI = async (): Promise<MyPortfolioResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인 해주세요!");
  }

  const response = await portfolioAPI.get<APIResponse<MyPortfolioResponse>>(
    "/my",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.data;
};

//공유 포트폴리오 상세조회
export interface PortfolioDetailResponse {
  id: string;
  title: string;
  description?: string;
  category: string;
  portfolioId: number;
  market?: string;
  sector?: string[];

  marketCap?: RangeValue;
  per?: RangeValue;
  eps?: RangeValue;
  bps?: RangeValue;
  pbr?: RangeValue;
  dividendYield?: RangeValue;
  foreignerRatio?: RangeValue;
  sps?: RangeValue;
  saleAccount?: RangeValue;
  crntRate?: RangeValue;
  lbltRate?: RangeValue;
  ntinInrt?: RangeValue;
  bsopPrfiInrt?: RangeValue;
  grs?: RangeValue;
  roeVal?: RangeValue;
  bsopPrti?: RangeValue;
  thtrNtin?: RangeValue;
}

export const getSharePortfolioDetailAPI = async (
  portfolioId: number
): Promise<PortfolioDetailResponse> => {
  const response = await portfolioAPI.get<APIResponse<PortfolioDetailResponse>>(
    `/share/${portfolioId}`
  );
  return response.data.data;
};

export const getMyPortfolioDetailAPI = async (
  portfolioId: number
): Promise<PortfolioDetailResponse> => {
  const response = await portfolioAPI.get<APIResponse<PortfolioDetailResponse>>(
    `/my/${portfolioId}`
  );
  return response.data.data;
};

// 내 포트폴리오 알림 조회 API (GET)
export interface TelegramAlerts {
  alertId: number;
  portfolioId: number;
  userId: string;
  createdAt: string;
}

// 내 포트폴리오 알림 조회
export const getTelegramAlertsAPI = async (): Promise<
  APIResponse<TelegramAlerts[]>
> => {
  const response =
    await portfolioAPI.get<APIResponse<TelegramAlerts[]>>("/alerts");
  return response.data;
};

// 내 포트폴리오 알림 추가
export const postTelegramAlertAPI = async (
  portfolioId: number
): Promise<APIResponse<null>> => {
  const response = await portfolioAPI.post<APIResponse<null>>("/alerts", {
    portfolioId: portfolioId,
  });
  return response.data;
};

// 내 포트폴리오 알림 삭제
export const deleteTelegramAlertAPI = async (
  alertId: number
): Promise<APIResponse<null>> => {
  const response = await portfolioAPI.delete<APIResponse<null>>(
    `/alerts/${alertId}`
  );
  return response.data;
};

//댓글
//댓글 작성
export interface CommentRequest {
  content: string;
}

export const createPortfolioCommentAPI = async (
  sharePortfolioId: number,
  content: string
): Promise<APIResponse<null>> => {
  const response = await portfolioAPI.post<APIResponse<null>>(
    `/share/${sharePortfolioId}/comments`,
    JSON.stringify({ content }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      transformRequest: [
        (data) => {
          return data;
        },
      ],
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

export const getPortfolioCommentsAPI = async (
  sharePortfolioId: number
): Promise<CommentsResponse> => {
  const response = await portfolioAPI.get<APIResponse<CommentsResponse>>(
    `/share/${sharePortfolioId}/comments`
  );
  // API 응답 형식에 맞게 데이터 변환
  return {
    commentCnt: response.data.data.commentCnt,
    comments: response.data.data.comments,
  };
};

// 댓글 삭제 API
export const deletePortfolioCommentAPI = async (
  sharePortfolioId: number,
  commentId: number
): Promise<APIResponse<null>> => {
  const response = await portfolioAPI.delete<APIResponse<null>>(
    `/share/${sharePortfolioId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  return response.data;
};

//댓글 수정
export interface CommentRequest {
  content: string;
}

export const editPortfolioCommentAPI = async (
  sharePortfolioId: number,
  commentId: number,
  content: string
): Promise<APIResponse<null>> => {
  const response = await portfolioAPI.patch<APIResponse<null>>(
    `/share/${sharePortfolioId}/comments/${commentId}`,
    JSON.stringify({ content }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      transformRequest: [
        (data) => {
          return data;
        },
      ],
    }
  );

  return response.data;
};

// 포트폴리오 평균값 조회 (GET)
export interface SummaryResponse {
  avgMarketCap: number;
  avgPer: number;
  avgDebt: number;
  avgDividend: number;
}

export const getMySummaryAPI = async (
  myPortfolioId: string
): Promise<APIResponse<SummaryResponse>> => {
  const response = await portfolioAPI.get<APIResponse<SummaryResponse>>(
    `/my/${myPortfolioId}/summary`
  );

  return response.data;
};

export const getShareSummaryAPI = async (
  sharePortfolioId: string
): Promise<APIResponse<SummaryResponse>> => {
  const response = await portfolioAPI.get<APIResponse<SummaryResponse>>(
    `/share/${sharePortfolioId}/summary`
  );
  return response.data;
};

// 나의 포트폴리오 공유 (POST)
export interface ShareMyPortfolio {
  portfolioId: number;
}

export const shareMyPortfolioAPI = async (
  portfolioId: number
): Promise<ShareMyPortfolio> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인 해주세요");
  }

  const response = await portfolioAPI.post<APIResponse<ShareMyPortfolio>>(
    `/my/${portfolioId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("포트폴리오 공유 응답:", response.data);
  return response.data.data;
};

// 나의 포트폴리오 삭제 API (DELETE)
export interface SaveSharePortfolio {
  portfolioId: number;
}

export const deleteMyPortfolioAPI = async (
  myPortfolioId: number
): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("로그인 해주세요.");
  }

  const response = await portfolioAPI.delete(`/my/${myPortfolioId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// 남의 공유 포트폴리오 가져오기(저장) (POST)
export const saveSharePortfolioAPI = async (
  portfolioId: number
): Promise<SaveSharePortfolio> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인 해주세요");
  }

  const response = await portfolioAPI.post<APIResponse<SaveSharePortfolio>>(
    `/share/${portfolioId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("공유 포트폴리오 가져오기 응답:", response.data);
  return response.data.data;
};

// 공유포폴 종목리스트 조회
export interface SharePortfolioStocksResponse {
  // stockCnt: number;
  stocks: Stock[];
  portfolioTitle?: string;
  portfolioDescription?: string;
  totalCount: number;
}
// 통합된 Stock 타입 정의
export interface Stock {
  stockId: number;
  ticker: string;
  marketType: string;
  companyName: string;
  sector: string;
  companyOverview?: string;
  snowflakeS?: {
    [key: string]: number | undefined;
  };
  marketCap: number;
  per: number;
  bps?: number;
  dividendYield?: number;
  foreignerRatio?: number;
  lbltRate: number;
  roeVal?: number;
  weekRateChange: number;
  yearRateChange: number;
  currentPrice: number;
  changeRate: number;
  fav: boolean;
}

// FilterStock을 Stock의 확장으로 정의
export interface FilterStock extends Stock {
  totalCount?: number; // 필요한 경우에만 포함
}
export const getSharePortfolioStocksAPI = async (
  portfolioId: number,
  page: number = 0
): Promise<SharePortfolioStocksResponse> => {
  const response = await portfolioAPI.get<
    APIResponse<SharePortfolioStocksResponse>
  >(`/share/${portfolioId}/stock?page=${page}`);
  console.log("API 원시 응답:", response);
  console.log("API 데이터:", response.data);

  return response.data.data;
};

// 나의 포트폴리오 종목리스트 조회
export const getMyPortfolioStocksAPI = async (
  portfolioId: number,
  page: number = 0
): Promise<SharePortfolioStocksResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("로그인 해주세요!");
  }

  const response = await portfolioAPI.get<
    APIResponse<SharePortfolioStocksResponse>
  >(`/my/${portfolioId}/stock?page=${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
};
