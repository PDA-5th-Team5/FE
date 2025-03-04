import Bookmark from "../../components/bookmark/Bookmark";
import * as S from "./StockPage.styled";
import SamsungImg from "../../assets/images/samsung.png";

const StockPage = () => {
  return (
    <S.StockPageContainer>
      <S.StockInfoContainer>
        <S.StockInfoTop>
          <S.StockInfoLeft>
            <S.StockInfoImg src={SamsungImg} />
            <S.StockInfo>
              <S.StockInfoSector>반도체</S.StockInfoSector>
              <S.StockInfoName>삼성전자</S.StockInfoName>
              <S.StockInfoWrapper>
                <S.StockInfoMarket>KOSPI</S.StockInfoMarket>
                <S.StockInfoTicker>005930</S.StockInfoTicker>
              </S.StockInfoWrapper>
            </S.StockInfo>
          </S.StockInfoLeft>
          <S.StockInfoRight>B{/* <Bookmark /> */}</S.StockInfoRight>
        </S.StockInfoTop>
        <S.StockInfoBottom>
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>현재가</S.StockInfoTitle>
            <S.StockInfoContent>58,600원</S.StockInfoContent>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>시가총액</S.StockInfoTitle>
            <S.StockInfoContent>393.32조</S.StockInfoContent>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>7일 수익률</S.StockInfoTitle>
            <S.StockInfoNum $isPositive={true}>2.47%</S.StockInfoNum>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>1년 수익률</S.StockInfoTitle>
            <S.StockInfoNum $isPositive={false}>-2.47%</S.StockInfoNum>
          </S.StockInfoItem>
          {/* ------- */}
        </S.StockInfoBottom>
      </S.StockInfoContainer>
    </S.StockPageContainer>
  );
};

export default StockPage;
