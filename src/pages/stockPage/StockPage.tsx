import Bookmark from "../../components/bookmark/Bookmark";
import * as S from "./StockPage.styled";
import SamsungImg from "../../assets/images/samsung.png";
import Comment from "../../components/comment/Comment";
import { CommentsData } from "../../types/commentTypes";
import CandleChart from "./components/candleChart/CandleChart";
import LineGraph from "./components/lineGraph/LineGrpah";
import { useState } from "react";
import { StockDetail } from "../../types/stockTypes";
import {
  Item,
  labelMapping,
  SnowflakeSElements,
} from "../../types/snowflakeTypes";
import StockSnowflake from "../../components/snowflake/StockSnowflake";

export interface StockDataType {
  status: number;
  message: string;
  data: {
    stockInfo: StockDetail;
    snowflakeS: SnowflakeSElements;
  };
}

// 주식 더미
const dummyStockData: StockDataType = {
  status: 200,
  message: "성공입니다.",
  data: {
    stockInfo: {
      stockId: 24,
      ticker: "005930",
      companyName: "덴티움",
      marketType: "KOSPI",
      currentPrice: 12345,
      marketCap: 5,
      sector: "건강관리장비와용품",
      companyOverview:
        "동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.",

      eps: 8720.0,
      bps: 43695.0,
      pbr: 1.62,
      "1WeekProfitRate": 1000,
      "1YearProfitRate": 1000,
      dividendYeild: 2.47,
      sectorAveragePer: 89.8,
      isBookmark: true,
    },
    snowflakeS: {
      per: 15,
      lbltRate: 2,
      marketCap: 11,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
};
// 댓글 더미
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

const StockPage = () => {
  const [stockData, setStockData] = useState<StockDataType>(dummyStockData);

  const snowflakeItems: Item[] = stockData.data.snowflakeS
    ? Object.entries(stockData.data.snowflakeS).map(([key, values]) => ({
        key,
        label: labelMapping[key] ?? key,
        D2Value: values,
        D1Value: values,
      }))
    : [];

  // 각 주식의 스노우플레이크 요소의 키 목록
  const snowflakeSelectedKeys: string[] = stockData.data.snowflakeS
    ? Object.keys(stockData.data.snowflakeS)
    : [];

  const handleToggleBookmark = (stockId: number, newState: boolean) => {
    setStockData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        stockInfo: {
          ...prevData.data.stockInfo,
          isBookmark: newState,
        },
      },
    }));
    // TODO: 추가 로직 (예: API 호출 등)
  };

  return (
    <S.StockPageContainer>
      <S.StockInfoContainer>
        <S.StockInfoTop>
          <S.StockInfoLeft>
            <S.StockInfoImg src={SamsungImg} />
            <S.StockInfo>
              <S.StockInfoSector>
                {stockData.data.stockInfo.sector}
              </S.StockInfoSector>
              <S.StockInfoName>
                {stockData.data.stockInfo.companyName}
              </S.StockInfoName>
              <S.StockInfoWrapper>
                <S.StockInfoMarket>
                  {stockData.data.stockInfo.marketType}
                </S.StockInfoMarket>
                <S.StockInfoTicker>
                  {stockData.data.stockInfo.ticker}
                </S.StockInfoTicker>
              </S.StockInfoWrapper>
            </S.StockInfo>
          </S.StockInfoLeft>
          <S.StockInfoRight>
            <Bookmark
              stockId={stockData.data.stockInfo.stockId}
              isBookmarked={stockData.data.stockInfo.isBookmark}
              onToggleBookmark={handleToggleBookmark}
            />
          </S.StockInfoRight>
        </S.StockInfoTop>
        <S.StockInfoBottom>
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>현재가</S.StockInfoTitle>
            <S.StockInfoContent>
              {stockData.data.stockInfo.currentPrice}원
            </S.StockInfoContent>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>시가총액</S.StockInfoTitle>
            <S.StockInfoContent>
              {stockData.data.stockInfo.marketCap}조
            </S.StockInfoContent>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>7일 수익률</S.StockInfoTitle>
            <S.StockInfoNum $isPositive={true}>
              {stockData.data.stockInfo["1WeekProfitRate"]}%
            </S.StockInfoNum>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>1년 수익률</S.StockInfoTitle>
            <S.StockInfoNum $isPositive={false}>
              {stockData.data.stockInfo["1YearProfitRate"]}%
            </S.StockInfoNum>
          </S.StockInfoItem>
          {/* ------- */}
        </S.StockInfoBottom>
      </S.StockInfoContainer>

      <S.StockOutlineContainer>
        <S.StockOutline>
          <S.StockOutlineLeft>
            <S.Title>
              {stockData.data.stockInfo.companyName} | 주식 개요
            </S.Title>
            <S.Content>{stockData.data.stockInfo.companyOverview}</S.Content>
          </S.StockOutlineLeft>
          <S.StockOutlineRight>
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>eps</S.StockOutlineTitle>
              <S.StockOutlineContent>
                {stockData.data.stockInfo.eps}원
              </S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>pbr</S.StockOutlineTitle>
              <S.StockOutlineContent>
                {stockData.data.stockInfo.pbr}배
              </S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>bps</S.StockOutlineTitle>
              <S.StockOutlineContent>
                {stockData.data.stockInfo.bps}원
              </S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>배당수익률</S.StockOutlineTitle>
              <S.StockOutlineContent>
                {stockData.data.stockInfo.dividendYeild}%
              </S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
            {/* 아이템 하나 */}
            <S.StockOutlineItem>
              <S.StockOutlineTitle>동일업종 PER</S.StockOutlineTitle>
              <S.StockOutlineContent>
                {stockData.data.stockInfo.sectorAveragePer}배
              </S.StockOutlineContent>
            </S.StockOutlineItem>
            {/* ------- */}
          </S.StockOutlineRight>
        </S.StockOutline>
        <S.StockSnowflake>
          <StockSnowflake
            allItems={snowflakeItems}
            selectedKeys={snowflakeSelectedKeys}
            showLabels={true}
            fontSize={12}
          />
        </S.StockSnowflake>
      </S.StockOutlineContainer>

      <S.StockCandleChart>
        <S.TitleWrapper>
          <S.Title>캔들차트</S.Title>
          <S.SubTitle>* 일봉 기준</S.SubTitle>
        </S.TitleWrapper>
        <CandleChart />
      </S.StockCandleChart>

      <S.StockCompetitor>
        <S.Title>{stockData.data.stockInfo.companyName} 경쟁사</S.Title>
      </S.StockCompetitor>

      <S.StockLineGraph>
        <S.Title>라인그래프</S.Title>
        <LineGraph />
      </S.StockLineGraph>

      <S.StockComments>
        <Comment commentsData={commentsData} />
      </S.StockComments>
    </S.StockPageContainer>
  );
};

export default StockPage;
