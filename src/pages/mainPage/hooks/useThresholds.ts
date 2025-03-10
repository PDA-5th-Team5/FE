import { useQuery } from "react-query";
import { getThresholdsAPI } from "../../../apis/stock";

export const useThresholds = () => {
  return useQuery({
    queryKey: ["thresholds"],
    queryFn: getThresholdsAPI,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
    cacheTime: 24 * 60 * 60 * 1000,
    onError: (error) => {
      console.error("임계값 데이터를 불러오는데 실패했습니다.", error);
    },
  });
};
