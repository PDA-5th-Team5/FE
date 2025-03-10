import { useQuery } from "react-query";
import { getSectorsAPI } from "../../../apis/stock";

export const useSectors = () => {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: getSectorsAPI,
    staleTime: 24 * 60 * 60 * 1000, // 24시간
    cacheTime: 24 * 60 * 60 * 1000,
    onError: (error) => {
      console.error("섹터 데이터를 불러오는데 실패했습니다.", error);
    },
  });
};
