export interface PortfolioDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  portfolioId: number;
  market: string;
  sector: string[];
  bsopPrti?: { min: number; max: number }; // 영업이익
  thtrNtin?: { min: number; max: number }; // 당기순이익
  roeVal?: { min: number; max: number }; // ROE (자기자본이익률)
  cptlNtinRate?: { min: number; max: number }; // 총자본 순이익률
  eps?: { min: number; max: number }; // EPS (주당순이익)
  per?: { min: number; max: number }; // PER (주가수익비율)
  grs?: { min: number; max: number }; // 매출액 증가율
  bsopPrfiInrt?: { min: number; max: number }; // 영업이익 증가율
  ntinInrt?: { min: number; max: number }; // 순이익 증가율
  lbltRate?: { min: number; max: number }; // 부채 비율
  crntRate?: { min: number; max: number }; // 유동 비율
  bps?: { min: number; max: number }; // 주당순자산 (BPS)
  saleAccount?: { min: number; max: number }; // 매출액
  marketCap?: { min: number; max: number }; // 시가총액
  sps?: { min: number; max: number }; // 주당매출액 (SPS)
  divYield?: { min: number; max: number }; // 배당수익률
  foreignerRatio?: { min: number; max: number }; // 외국인 보유율
}
