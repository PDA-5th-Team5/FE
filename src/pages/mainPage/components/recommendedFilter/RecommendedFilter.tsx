import * as S from "./RecommendedFilter.styled";
import ExampleImg from "../../../../assets/images/example.png";
import ImportIcon from "../../../../assets/images/icons/import.png";

const RecommendedFilter: React.FC = () => {
  return (
    <S.MainPageRecommendedFilterWrapper>
      <S.MainPageRecommendedFilterImg src={ExampleImg} />
      <S.MainPageRecommendedFilterInfo>
        <S.MainPageRecommendedFilterTitle>
          인기있는 필터링 Top10
        </S.MainPageRecommendedFilterTitle>

        <S.MainPageRecommendedFilterCntWrapper>
          <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
          <S.MainPageRecommendedFilterCnt>
            12,000
          </S.MainPageRecommendedFilterCnt>
        </S.MainPageRecommendedFilterCntWrapper>
      </S.MainPageRecommendedFilterInfo>
    </S.MainPageRecommendedFilterWrapper>
  );
};

export default RecommendedFilter;
