import exp from "constants";
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

export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const sharePortfolioListAPI = async (
  sortBy: string = "loadCount"
): Promise<SharePortfolioItem[]> => {
  const response = await portfolioAPI.get<APIResponse<SharePortfolioItem[]>>(
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

  console.log("🟢 포트폴리오 공유 응답:", response.data);
  return response.data.data;
};
