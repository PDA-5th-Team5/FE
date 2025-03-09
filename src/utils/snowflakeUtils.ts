import { defaultFilterItems } from "../pages/mainPage/constants/defaultFilterItems";
import { PortfolioDetail } from "../types/portfolioTypes";
import { Item, labelMapping } from "../types/snowflakeTypes";

export const transformElementsToItems = (elements: {
  [key: string]: number[];
}): Item[] =>
  Object.entries(elements).map(([key, values]) => ({
    key,
    label: labelMapping[key] ?? key, // 매핑된 한글 라벨 사용, 없으면 원래 key 사용
    D1Value: values[1] ?? 20, // 최대
    D2Value: values[0] ?? 0, // 최소
  }));

// portfolio 안의 재무 지표를 Item[] 타입으로 변환하는 함수
export const transformPortfolioToItems = (
  portfolio: PortfolioDetail
): Item[] => {
  const items: Item[] = [];

  // labelMapping에 정의된 각 영어 키에 대해 반복
  Object.keys(labelMapping).forEach((englishKey) => {
    const metric = portfolio[englishKey as keyof PortfolioDetail] as
      | { min: number; max: number }
      | undefined;

    if (metric) {
      // defaultFilterItems에서, key가 labelMapping[englishKey]와 일치하는 항목을 찾기
      const defaultItem = defaultFilterItems.find(
        (item) => item.key === (labelMapping[englishKey] || englishKey)
      );

      items.push({
        // defaultItem이 있으면 그 항목의 key와 label을 사용, 없으면 labelMapping에서 변환
        key: defaultItem
          ? defaultItem.key
          : labelMapping[englishKey] || englishKey,
        label: defaultItem
          ? defaultItem.label
          : labelMapping[englishKey] || englishKey,
        D1Value: metric.max, // 최대값
        D2Value: metric.min !== undefined ? metric.min : 0, // 최소값
      });
    }
  });

  return items;
};
