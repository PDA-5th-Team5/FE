import { APIResponse, portfolioAPI } from ".";
import { PortfolioDetail } from "../types/portfolioTypes";

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
