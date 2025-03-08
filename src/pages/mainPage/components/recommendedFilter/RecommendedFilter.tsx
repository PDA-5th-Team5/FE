import * as S from "./RecommendedFilter.styled";
import ImportIcon from "../../../../assets/images/icons/import.png";
import { PopularPortfolio } from "../../../../apis/portfolio";
import PortfolioSnowflake from "../../../../components/snowflake/PortfolioSnowflake";
import { transformPortfolioToItems } from "../../../../utils/snowflakeUtils";

interface RecommendedFilterProps {
  data: PopularPortfolio;
}

const RecommendedFilter = ({ data }: RecommendedFilterProps) => {
  const items = transformPortfolioToItems(data.portfolio);
  const selectedKeys = items.map((item) => item.key);

  return (
    <S.MainPageRecommendedFilterWrapper>
      <S.PortfolioSnowflakeWrapper>
        <PortfolioSnowflake
          allItems={items}
          selectedKeys={selectedKeys}
          showLabels={false}
        />
      </S.PortfolioSnowflakeWrapper>
      <S.MainPageRecommendedFilterInfo>
        <S.MainPageRecommendedFilterTitle>
          {data.portfolio.title}
        </S.MainPageRecommendedFilterTitle>

        <S.MainPageRecommendedFilterCntWrapper>
          <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
          <S.MainPageRecommendedFilterCnt>
            {data.loadCount}
          </S.MainPageRecommendedFilterCnt>
        </S.MainPageRecommendedFilterCntWrapper>
      </S.MainPageRecommendedFilterInfo>
    </S.MainPageRecommendedFilterWrapper>
  );
};

export default RecommendedFilter;
