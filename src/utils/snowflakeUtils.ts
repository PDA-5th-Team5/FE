import { PortfolioDetail } from "../types/portfolioTypes";
import { Item, labelMapping } from "../types/snowflakeTypes";

export const transformElementsToItems = (elements: {
  [key: string]: number[];
}): Item[] =>
  Object.entries(elements).map(([key, values]) => ({
    key,
    label: labelMapping[key] ?? key, // 매핑된 한글 라벨 사용, 없으면 원래 key 사용
    D2Value: values[0], // 최소
    D1Value: values[1], // 최대
  }));

// portfolio 안의 재무 지표를 Item[] 타입으로 변환하는 함수
export const transformPortfolioToItems = (
  portfolio: PortfolioDetail
): Item[] => {
  const items: Item[] = [];

  // labelMapping에 정의된 각 key에 대해 반복
  Object.keys(labelMapping).forEach((key) => {
    // portfolio에서 해당 키의 값을 가져오기
    const metric = portfolio[key as keyof PortfolioDetail] as
      | { min: number; max: number }
      | undefined;
    if (metric) {
      items.push({
        key, // ex) "marketCap"
        label: labelMapping[key] || key, // labelMapping에 없는 경우 키를 그대로 사용
        D1Value: metric.min, // 최소값
        D2Value: metric.max, // 최대값
      });
    }
  });

  return items;
};
