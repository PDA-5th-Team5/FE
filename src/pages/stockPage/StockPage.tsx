import Bookmark from "../../components/bookmark/Bookmark";
import * as S from "./StockPage.styled";
import SamsungImg from "../../assets/images/samsung.png";
import Comment from "../../components/comment/Comment";
import { CommentsData } from "../../types/commentTypes";
import CandleChart from "./components/CandleChart";

const StockPage = () => {
  const commentsData: CommentsData = {
    commentsCnt: 12,
    comments: [
      {
        commentId: 1,
        nickname: "김도은",
        userId: 2,
        content: "댓글내용 1",
        date: "2024.02.18",
      },
      {
        commentId: 2,
        nickname: "이수용",
        userId: 1,
        content: "댓글내용 2",
        date: "2024.02.18",
      },
    ],
  };

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

      <S.StockOutlineContainer>
        <S.StockOutline>
          <S.StockOutlineLeft>
            <S.Title>삼성전자 | 주식 개요</S.Title>
            <S.Content>
              한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC,
              Harman 등 229개의 종속기업으로 구성된 글로벌 전자기업임.
            </S.Content>
          </S.StockOutlineLeft>
          <S.StockOutlineRight>
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>eps</S.StockOutlineTitle>
              <S.StockOutlineContent>4,359원</S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>pbr</S.StockOutlineTitle>
              <S.StockOutlineContent>1.01배</S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>bps</S.StockOutlineTitle>
              <S.StockOutlineContent>57,981원</S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>배당수익률</S.StockOutlineTitle>
              <S.StockOutlineContent>2.47%</S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>동일업종 PER</S.StockOutlineTitle>
              <S.StockOutlineContent>89.80배</S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
          </S.StockOutlineRight>
        </S.StockOutline>
        <S.StockSnowflake>O</S.StockSnowflake>
      </S.StockOutlineContainer>

      <S.StockCandleChart>
        <S.TitleWrapper>
          <S.Title>캔들차트</S.Title>
          <S.SubTitle>* 일봉 기준</S.SubTitle>
        </S.TitleWrapper>
        <CandleChart />
      </S.StockCandleChart>

      <S.StockCompetitor>
        <S.Title>삼성전자(주) 경쟁사</S.Title>
      </S.StockCompetitor>

      <S.StockLineGraph>
        <S.Title>라인그래프</S.Title>
      </S.StockLineGraph>

      <S.StockComments>
        <Comment commentsData={commentsData} />
      </S.StockComments>
    </S.StockPageContainer>
  );
};

export default StockPage;
