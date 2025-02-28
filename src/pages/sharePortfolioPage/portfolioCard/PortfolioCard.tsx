import * as S from "./PortfolioCard.styled";
import Example from "../../../assets/images/exampleCard.png";
import ImportIcon from "../../../assets/images/icons/import.png";

const PortfolioCard = () => {
  return (
    <S.PortfolioCardContainer>
      <S.PortfolioCardTitle>포트폴리오 이름은 이거</S.PortfolioCardTitle>
      <S.CardContent>
        {/* 앞면: 줄임표 설명 + 이미지 */}
        <S.FrontContent className="front">
          <S.ShortDescription>
            포트폴리오에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에.
          </S.ShortDescription>
          <S.CardImgWrapper>
            <S.CardImg src={Example} />
          </S.CardImgWrapper>
        </S.FrontContent>

        {/* 뒷면: 더 많은 텍스트 (이미지 없이) */}
        <S.BackContent className="back">
          <S.LongDescription>
            포트폴리오에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에.
          </S.LongDescription>
        </S.BackContent>
      </S.CardContent>

      <S.CardFooter>
        <S.CardFooterItem>
          <S.CardFooterTitle>마켓</S.CardFooterTitle>
          <S.CardFooterPrice>코스피</S.CardFooterPrice>
        </S.CardFooterItem>

        <S.CardFooterItem>
          <S.CardFooterImportIconWrapper>
            <S.CardFooterImportIcon src={ImportIcon} /> 999+
          </S.CardFooterImportIconWrapper>
        </S.CardFooterItem>
      </S.CardFooter>
    </S.PortfolioCardContainer>
  );
};

export default PortfolioCard;
