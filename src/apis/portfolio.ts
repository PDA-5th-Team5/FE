import { APIResponse, portfolioAPI } from ".";
import { PortfolioDetail } from "../types/portfolioTypes";

// 1) 인기 포트폴리오 조회
export interface PopularPortfolio {
  sharePortfolioId: number;
  loadCount: number;
  createdAt: string;
  portfolio: PortfolioDetail;
}

export const popularPortfolioAPI = async (
  activeTab: string
): Promise<PopularPortfolio[]> => {
  const response = await portfolioAPI.get<APIResponse<PopularPortfolio[]>>(
    `/${activeTab}`
  );

  return response.data.data;
};
