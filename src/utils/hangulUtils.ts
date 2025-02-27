// 초성
export const CHO = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 초성만 뽑는 함수
export function getInitialConsonant(word: string): string {
  const code = word.charCodeAt(0) - 0xac00;

  // 한글이 아니면
  if (code < 0 || code > 11171) {
    return word[0];
  }
  const choIndex = Math.floor(code / (21 * 28));

  return CHO[choIndex] || word[0];
}

// 초성별로 그룹화하는 함수
export function groupByInitialConsonant(
  items: string[]
): Record<string, string[]> {
  const grouped = items.reduce(
    (acc, item) => {
      const initial = getInitialConsonant(item);
      if (!acc[initial]) acc[initial] = [];
      acc[initial].push(item);
      return acc;
    },
    {} as Record<string, string[]>
  );

  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => a.localeCompare(b));
  });

  return grouped;
}
