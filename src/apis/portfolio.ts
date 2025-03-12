import { APIResponse, portfolioAPI } from ".";
import { PortfolioDetail,MyPortfolioResponse } from "../types/portfolioTypes";
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


export const sharePortfolioListAPI = async(sortBy: string = "loadCount"): Promise<SharePortfolioItem[]> => {
  const response = await portfolioAPI.get<APIResponse<SharePortfolioItem[]>>(
    `/share/board?page=0&sortBy=${sortBy}`
  );
  return response.data.data;
}

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

export const getSharePortfolioDetailAPI = async(portfolioId: number): Promise<PortfolioDetailResponse> => {
  const response = await portfolioAPI.get<APIResponse<PortfolioDetailResponse>>(
    `/share/${portfolioId}`
  );
  return response.data.data;
}

export const getMyPortfolioDetailAPI = async(portfolioId: number): Promise<PortfolioDetailResponse> => {
  const response = await portfolioAPI.get<APIResponse<PortfolioDetailResponse>>(
    `/my/${portfolioId}`
  );
  return response.data.data;
}

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
