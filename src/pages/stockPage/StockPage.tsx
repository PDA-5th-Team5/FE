import Bookmark from "../../components/bookmark/Bookmark";
import * as S from "./StockPage.styled";
import SamsungImg from "../../assets/images/samsung.png";
import Comment from "../../components/comment/Comment";
import CandleChart from "./components/candleChart/CandleChart";
import LineGraph from "./components/lineGraph/LineGrpah";
import { useEffect, useState } from "react";
import { StockDetail } from "../../types/stockTypes";
import {
  Item,
  labelMapping,
  SnowflakeSElements,
} from "../../types/snowflakeTypes";
import StockSnowflake from "../../components/snowflake/StockSnowflake";
import { commentsData, dummyCompetitors, dummyStockData } from "./dummy";

export interface StockDataType {
  status: number;
  message: string;
  data: {
    stockInfo: StockDetail;
    snowflakeS: SnowflakeSElements;
  };
}

const StockPage = () => {
  const [stockData, setStockData] = useState<StockDataType>(dummyStockData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const competitorSnowflakeData = dummyCompetitors.map((competitor) => {
    const items: Item[] = Object.entries(competitor.snowflakeS).map(
      ([key, value]) => ({
        key,
        label: labelMapping[key] ?? key,
        D1Value: value,
        D2Value: value,
      })
    );
    return { competitor, items };
  });

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
        <S.StockCompetitorItemContainer>
          {competitorSnowflakeData.map(({ competitor, items }, index) => (
            <S.StockCompetitorItem key={index}>
              {/* 스노우플레이크 차트 */}
              <S.StockSnowflakeWrapper>
                <StockSnowflake
                  allItems={items}
                  selectedKeys={items.map((item) => item.key)}
                  showLabels={true}
                  fontSize={10}
                />
              </S.StockSnowflakeWrapper>

              {/* 회사명 + 티커 */}
              <S.StockCompetitorNameWrapper>
                <S.StockCompetitorName>
                  {competitor.companyName}
                </S.StockCompetitorName>
                <S.StockCompetitorTicker>
                  {competitor.ticker}
                </S.StockCompetitorTicker>
              </S.StockCompetitorNameWrapper>
            </S.StockCompetitorItem>
          ))}
        </S.StockCompetitorItemContainer>
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
