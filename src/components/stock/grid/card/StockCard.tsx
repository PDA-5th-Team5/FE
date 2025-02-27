import Bookmark from "../../../bookmark/Bookmark";
import * as S from "./StockCard.styled";
import Example from "../../../../assets/images/exampleCard.png";

const StockCard = () => {
  return (
    <S.CardContainer>
      <S.CardHeader>
        <S.CardHeaderLeft>
          <S.CardTitle>삼성전자</S.CardTitle>
          <S.CardMarketCap>₩4,500조</S.CardMarketCap>
        </S.CardHeaderLeft>

        <S.CardHeaderRight>{/* <Bookmark /> */}</S.CardHeaderRight>
      </S.CardHeader>

      <S.CardContent>
        {/* 앞면: 줄임표 설명 + 이미지 */}
        <S.FrontContent className="front">
          <S.ShortDescription>
            회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에
            대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한
            설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에.
          </S.ShortDescription>
          <S.CardImgWrapper>
            <S.CardImg src={Example} />
          </S.CardImgWrapper>
        </S.FrontContent>

        {/* 뒷면: 더 많은 텍스트 (이미지 없이) */}
        <S.BackContent className="back">
          <S.LongDescription>
            회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에
            대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한
            설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에. 회사에 대한
            설명 어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명
            어쩌구 저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에. 회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에. 회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에. 회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에. 회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에 대한 설명 어쩌구
            저쩌구회사에 대한 설명 어쩌구 저쩌구회사에.
          </S.LongDescription>
        </S.BackContent>
      </S.CardContent>

      <S.CardFooter>
        <S.CardFooterItem>
          <S.CardFooterTitle>AA950170</S.CardFooterTitle>
          <S.CardFooterPrice>₩4,500조</S.CardFooterPrice>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>7D</S.CardFooterTitle>
          <S.CardFooterChange>18.69%</S.CardFooterChange>
        </S.CardFooterItem>
        <S.CardFooterItem>
          <S.CardFooterTitle>1Y</S.CardFooterTitle>
          <S.CardFooterChange>-18.7%</S.CardFooterChange>
        </S.CardFooterItem>
      </S.CardFooter>
    </S.CardContainer>
  );
};

export default StockCard;
