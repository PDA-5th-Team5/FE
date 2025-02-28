import * as S from "./PortfolioCard.styled";
import Example from "../../../assets/images/exampleCard.png";
import ImportIcon from "../../../assets/images/icons/import.png";
import { SharePortfolio } from "../SharePortfolioPage";

interface PortfolioCardProps {
  portfolio: SharePortfolio;
}

const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
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
            <S.CardImg src={Example} />
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
          <S.CardFooterMarket>{portfolio.snowflake.market}</S.CardFooterMarket>
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
