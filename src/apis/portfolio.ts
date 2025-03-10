import { APIResponse, portfolioAPI } from ".";
import { PortfolioDetail } from "../types/portfolioTypes";
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
