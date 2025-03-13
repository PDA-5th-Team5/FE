// 시장가치를 변환하는 함수 (억 단위 -> 조 단위 변환)

// number
export const formatMarketCap = (marketCap: number): string => {
  // 1조 = 10000억
  if (marketCap >= 10000) {
    return `${(marketCap / 10000).toFixed(2)}조`;
  }
  return `${marketCap.toLocaleString()}억`;
};

// string
export const formatMarketCapS = (marketCapS: string): string => {
  // 1조 = 10000억
  const marketCap = Number(marketCapS);
  if (marketCap >= 10000) {
    return `${(marketCap / 10000).toFixed(2)}조`;
  }
  return `${marketCap.toLocaleString()}억`;
};
