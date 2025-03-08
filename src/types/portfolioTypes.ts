import { SnowflakeItems } from "./snowflakeTypes";

export interface PortfolioDetail extends SnowflakeItems {
  id: string;
  title: string;
  description: string;
  category: string;
  portfolioId: number;
  market: string;
  sector: string[];
}
