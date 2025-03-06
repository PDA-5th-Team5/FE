import * as S from "./PortfolioCard.styled";
import ImportIcon from "../../../assets/images/icons/import.png";
import { SharePortfolio } from "../SharePortfolioPage";
import PortfolioSnowflake from "../../../components/snowflake/PortfolioSnowflake";
import { Item, labelMapping } from "../../../types/snowflakeTypes";

interface PortfolioCardProps {
  portfolio: SharePortfolio;
}

const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  // portfolio.snowflakeP.elements를 이용해 Item 배열 생성
  const portfolioItems: Item[] = portfolio.snowflakeP
    ? Object.entries(portfolio.snowflakeP.elements).map(([key, values]) => ({
        key,
        label: labelMapping[key] ?? key,
        D2Value: values[0],
        D1Value: values[1],
      }))
    : [];

  // 각 주식의 스노우플레이크 요소의 키 목록
  const selectedPortfolioKeys = portfolioItems.map((item) => item.key);

  return (
    <S.PortfolioCardContainer
      to={`/portfolio/share/${portfolio.sharePortfolioId}`}
    >
      <S.PortfolioCardTitle>
        {portfolio.sharePortfolioTitle}
      </S.PortfolioCardTitle>
      <S.CardContent>
        {/* 앞면: 줄임표 설명 + 이미지 */}
        <S.FrontContent className="front">
          <S.ShortDescription>
            {portfolio.sharePortfolioDescription}
          </S.ShortDescription>
          <S.CardImgWrapper>
            <PortfolioSnowflake
              allItems={portfolioItems}
              selectedKeys={selectedPortfolioKeys}
              showLabels={true}
              fontSize={10}
            />
          </S.CardImgWrapper>
        </S.FrontContent>

        {/* 뒷면: 더 많은 텍스트 (이미지 없이) */}
        <S.BackContent className="back">
          <S.LongDescription>
            {portfolio.sharePortfolioDescription}
          </S.LongDescription>
        </S.BackContent>
      </S.CardContent>

      <S.CardFooter>
        <S.CardFooterItem>
          <S.CardFooterTitle>마켓</S.CardFooterTitle>
          <S.CardFooterMarket>{portfolio.snowflakeP.market}</S.CardFooterMarket>
        </S.CardFooterItem>

        <S.CardFooterItem>
          <S.CardFooterImportIconWrapper>
            <S.CardFooterImportIcon src={ImportIcon} />
            {portfolio.sharePortfolioImportCnt}
          </S.CardFooterImportIconWrapper>
        </S.CardFooterItem>
      </S.CardFooter>
    </S.PortfolioCardContainer>
  );
};

export default PortfolioCard;
