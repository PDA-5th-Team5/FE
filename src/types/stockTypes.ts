import { SnowflakeP, SnowflakeS } from "./snowflakeTypes";

export interface Stock {
  stockId: number;
  ticker: string;
  companyName: string;
  currentPrice: number;
  "1DayFluctuationRate": number;
  "1WeekFluctuationRate": number;
  "1YearFluctuationRate": number;
  marketCap: number;
  per: number;
  debtRate: number;
  sector: string;
  isBookmark: boolean;
  description: string;
  snowflakeS?: SnowflakeS;
  snowflakeP?: SnowflakeP;
}

export interface StockDetail {
  stockId: number;
  ticker: string;
  companyName: string;
  marketType: string;
  currentPrice: number;
  marketCap: number;
  "1WeekProfitRate": number;
  "1YearProfitRate": number;
  companyOverview: string;
  sector: string;
  eps: number;
  pbr: number;
  bps: number;
  dividendYeild: number;
  sectorAveragePer: number;
  isBookmark: boolean;
  snowflakeS?: SnowflakeS;
}
