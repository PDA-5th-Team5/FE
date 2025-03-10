// 1. Snowflake 요소들의 값
export interface SnowflakePElements {
  bsopPrti?: number[]; // 영업이익
  thtrNtin?: number[]; // 당기순이익
  roeVal?: number[]; // ROE (자기자본이익률)
  pbr?: number[]; // 총자본 순이익률
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
  dividendYield?: number[]; // 배당수익률
  foreignerRatio?: number[]; // 외국인 보유율
}

export interface SnowflakeSElements {
  bsopPrti?: number; // 영업이익
  thtrNtin?: number; // 당기순이익
  roeVal?: number; // ROE (자기자본이익률)
  pbr?: number; // 총자본 순이익률
  eps?: number; // EPS (주당순이익)
  per?: number; // PER (주가수익비율)
  grs?: number; // 매출액 증가율
  bsopPrfiInrt?: number; // 영업이익 증가율
  ntinInrt?: number; // 순이익 증가율
  lbltRate?: number; // 부채 비율
  crntRate?: number; // 유동 비율
  bps?: number; // 주당순자산 (BPS)
  saleAccount?: number; // 매출액
  marketCap?: number; // 시가총액
  sps?: number; // 주당매출액 (SPS)
  dividendYield?: number; // 배당수익률
  foreignerRatio?: number; // 외국인 보유율
}

// 2. Snowflake 관련 데이터
export interface SnowflakeS {
  elements: SnowflakeSElements;
}

export interface SnowflakeP {
  elements: SnowflakePElements;
  market: string;
  sectors: string[];
}

// 3. Snowflake 그래프 그릴 때 필요
export interface Item {
  key: string;
  label: string;
  D1Value: number;
  D2Value: number;
}

// 한글 라벨 매핑 객체
export const labelMapping: Record<string, string> = {
  marketCap: "시가총액",
  thtrNtin: "당기순이익",
  bsopPrti: "영업이익",
  per: "PER",
  eps: "EPS",
  bps: "BPS",
  pbr: "PBR",
  dividendYield: "배당수익률",
  foreignerRatio: "외국인 보유율",
  sps: "주당매출액",
  saleAccount: "매출액",
  crntRate: "유동비율",
  lbltRate: "부채비율", 
  ntinInrt: "순이익 증가율",
  bsopPrfiInrt: "영업이익 증가율",
  grs: "매출액 증가율",
  roeVal: "ROE",
};

// 새로운 snowflake 타입 - min/max 버전
export interface Range {
  min: number;
  max: number;
}

export interface SnowflakeItems {
  bsopPrti?: Range; // 영업이익
  thtrNtin?: Range; // 당기순이익
  roeVal?: Range; // ROE (자기자본이익률)
  pbr?: Range; // 총자본 순이익률
  eps?: Range; // EPS (주당순이익)
  per?: Range; // PER (주가수익비율)
  grs?: Range; // 매출액 증가율
  bsopPrfiInrt?: Range; // 영업이익 증가율
  ntinInrt?: Range; // 순이익 증가율
  lbltRate?: Range; // 부채 비율
  crntRate?: Range; // 유동 비율
  bps?: Range; // 주당순자산 (BPS)
  saleAccount?: Range; // 매출액
  marketCap?: Range; // 시가총액
  sps?: Range; // 주당매출액 (SPS)
  dividendYield?: Range; // 배당수익률
  foreignerRatio?: Range; // 외국인 보유율
}
