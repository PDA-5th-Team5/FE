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
