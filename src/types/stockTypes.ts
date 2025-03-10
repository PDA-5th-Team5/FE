import { SnowflakeP, SnowflakeS, SnowflakeSElements } from "./snowflakeTypes";

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

export interface Competitor {
  stockId: number;
  companyName: string;
  ticker: string;
  snowflakeS: {
    per: number;
    lblt_rate: number;
    marketCap: number;
    divYield: number;
    foreignerRatio: number;
  };
}

export interface FilterStock extends SnowflakeSElements {
  stockId: number;
  ticker: string;
  marketType: "ALL" | "KOSPI" | "KOSDAQ";
  companyName: string;
  sector: string;
  companyOverview: string;
  snowflakeS: Partial<SnowflakeSElements>;
  marketCap?: number;
  lbltRate?: number;
  weekRateChange: number;
  yearRateChange: number;
  currentPrice: number;
  changeRate: number;
  fav: boolean;
}
