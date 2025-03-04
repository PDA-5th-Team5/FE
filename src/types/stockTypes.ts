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
