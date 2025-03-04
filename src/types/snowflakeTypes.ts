// 1. Snowflake 요소들의 값
export interface SnoflakeElements {
  bsopPrti?: number[]; // 영업이익
  thtrNtin?: number[]; // 당기순이익
  roeVal?: number[]; // ROE (자기자본이익률)
  cptlNtinRate?: number[]; // 총자본 순이익률
  eps?: number[]; // EPS (주당순이익)
  per?: number[]; // PER (주가수익비율)
  grs?: number[]; // 매출액 증가율
  bsopPrfiInrt?: number[]; // 영업이익 증가율
  ntinInrt?: number[]; // 순이익 증가율
  lbltRate?: number[]; // 부채 비율
  crntRate?: number[]; // 유동 비율
  bps?: number[]; // 주당순자산 (BPS)
  saleAccount?: number[]; // 매출액
  marketCap?: number[]; // 시가총액
  sps?: number[]; // 주당매출액 (SPS)
  divYield?: number[]; // 배당수익률
  foreignerRatio?: number[]; // 외국인 보유율
}

// 2. Snowflake 관련 데이터
export interface Snowflake {
  elements: SnoflakeElements;
  market: string;
  sectors: string[];
}

// 3. Snowflake 그래프 그릴 때 필요
export interface Item {
  key: string;
  label: string;
  D1Value?: number;
  D2Value: number;
}

// 한글 라벨 매핑 객체
export const labelMapping: Record<string, string> = {
  bsopPrti: "영업이익",
  thtrNtin: "당기순이익",
  roeVal: "ROE",
  cptlNtinRate: "총자본 순이익률",
  eps: "EPS",
  per: "PER",
  grs: "매출액 증가율",
  bsopPrfiInrt: "영업이익 증가율",
  ntinInrt: "순이익 증가율",
  lbltRate: "부채 비율",
  crntRate: "유동 비율",
  bps: "BPS",
  saleAccount: "매출액",
  marketCap: "시가총액",
  sps: "SPS",
  divYield: "배당수익률",
  foreignerRatio: "외국인 보유율",
};
