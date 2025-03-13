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
  marketCap: string;
  "1WeekProfitRate": number;
  "1YearProfitRate": number;
  companyOverview: string;
  sector: string;
  eps: number;
  pbr: number;
  bps: number;
  dividendYeild: number;
  isBookmark?: boolean;
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
    dividendYield: number;
    foreignerRatio: number;
  };
}

export interface FilterStock extends SnowflakeSElements {
  totalCount: number;
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

// 통합된 Stock 타입 정의
export interface Stock {
  stockId: number;
  ticker: string;
  marketType: string;
  companyName: string;
  sector: string;
  companyOverview?: string;
  snowflakeS?: SnowflakeS;
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
// export interface FilterStock extends Stock {
//   totalCount?: number; // 필요한 경우에만 포함
// }