import * as S from "./PortfolioPage.styled";
import StockResult from "../../components/stock/result/StockResult";
import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
import PortfolioSnowflake from "../../components/snowflake/PortfolioSnowflake";
import LineGraph from "../../components/lineGraph/LineGraph";
import { Stock } from "../../types/stockTypes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getShareSummaryAPI,
  getMySummaryAPI,
  SummaryResponse,
} from "../../apis/portfolio";

export interface StockResultData {
  stockCnt: number;
  stockInfos: Stock[];
  portfolioTitle?: string;
  portfolioDescription?: string;
}

interface PortfolioPageProps {
  portfolioData?: any;
  elementsObj?: { [key: string]: number[] };
  snowflakeItems?: any[];
  description?: string;
  isMy?: boolean;
}

// 더미 데이터 : 나의 포트폴리오 종목 리스트 조회 + 포트폴리오명 & 설명
const dummyPortfolioResponse = {
  status: 200,
  message: "성공입니다.",
  data: {
    portfolioTitle: "포트폴리오명",
    portfolioDescription: "이 포트폴리오에 대한 설명을....",
    stockCnt: 12,
    stockInfos: [
      {
        snowflakeS: {
          elements: {
            bsopPrti: 19,
            thtrNtin: 3,
            roeVal: 16,
            pbr: 7,
            eps: 6,
            per: 18,
          },
        },
        stockId: 1,
        ticker: "05252",
        companyName: "삼성전자",
        currentPrice: 50000,
        "1DayFluctuationRate": 0.2,
        "1WeekFluctuationRate": 7.3,
        "1YearFluctuationRate": 13.1,
        marketCap: 4500,
        per: 13.56,
        debtRate: 30.49,
        sector: "반도체",
        isBookmark: true,
        description:
          "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
      },

      {
        snowflakeS: {
          elements: {
            bsopPrti: 8,
            thtrNtin: 3,
            roeVal: 20,
            pbr: 2,
          },
        },
        stockId: 2,
        ticker: "05252",
        companyName: "삼성전자",
        currentPrice: 50000,
        "1DayFluctuationRate": 0.2,
        "1WeekFluctuationRate": 7.3,
        "1YearFluctuationRate": 13.1,
        marketCap: 4500,
        per: 13.56,
        debtRate: 30.49,
        sector: "반도체",
        isBookmark: false,
        description:
          "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
      },
    ],
  },
};

const lineGraphData = {
  status: 200,
  message: "성공입니다.",
  data: {
    lineGraph: [
      {
        market: "KOSDAQ",
        price: { "20230101": 53000, "20230102": 54001 },
      },
      {
        portfolioTitle: "myPortfolio",
        avgClosePrice: { "20230101": 54200, "20230102": 39440 },
      },
    ],
  },
};

const PortfolioPage = ({
  portfolioData,
  elementsObj,
  snowflakeItems,
  isMy,
  // description,
}: PortfolioPageProps) => {
  const { num } = useParams<{ num: string }>();
  const [summary, setSummary] = useState<SummaryResponse>();

  // 공유 포트폴리오 평균값 조회
  useEffect(() => {
    if (num) {
      if (isMy) {
        getMySummaryAPI(num)
          .then((data) => {
            if (data.status === 200) {
              setSummary(data.data);
            } else if (data.status === 400) {
              console.log("나의 포트폴리오 평균값 조회 실패");
            } else {
              console.log("알 수 없는 오류 발생");
            }
          })
          .catch((error) => {
            console.error("API 호출 실패", error);
          });
      } else {
        getShareSummaryAPI(num)
          .then((data) => {
            if (data.status === 200) {
              setSummary(data.data);
            } else if (data.status === 400) {
              console.log("공유 포트폴리오 평균값 조회 실패");
            } else {
              console.log("알 수 없는 오류 발생");
            }
          })
          .catch((error) => {
            console.error("API 호출 실패", error);
          });
      }
    }
  }, [num]);

  const portfolioItems = portfolioData
    ? transformPortfolioToItems(portfolioData)
    : [];
  const selectedPortfolioKeys = portfolioItems.map((item) => item.key);
  const stockResultData: StockResultData = {
    stockCnt: dummyPortfolioResponse.data.stockCnt,
    stockInfos: dummyPortfolioResponse.data.stockInfos,
  };

  return (
    <S.PortfolioPageContainer>
      <S.PortfolioDescription>{portfolioData.title}</S.PortfolioDescription>

      <S.PortfolioContent>
        <S.PortfolioContentLeft>
          <S.PortfolioSummary>
            <S.PortfolioContentTitle>포트폴리오 요약</S.PortfolioContentTitle>
            <S.PortfolioSummaryItemWrapper>
              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine $isFirst={true} />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {/* 50조 */}
                    {summary?.avgMarketCap}억
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 시가총액
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {/* 23.08 */}
                    {summary?.avgPer}배
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 PER
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {/* 25.01% */}
                    {summary?.avgDebt}%
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 부채비율
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {/* 2.08 */}
                    {summary?.avgDividend}%
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 배당
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>
            </S.PortfolioSummaryItemWrapper>
          </S.PortfolioSummary>
          <S.PortfolioLineGraph>
            <S.PortfolioContentTitle>
              포트폴리오 vs 시장 그래프 비교
            </S.PortfolioContentTitle>
            <LineGraph data={lineGraphData} />
          </S.PortfolioLineGraph>
        </S.PortfolioContentLeft>
        <S.PortfolioContentRight>
          <S.PortfolioContentTitle>
            포트폴리오 Snowflake
            {/* //   {snowflakeItems} */}
          </S.PortfolioContentTitle>
          <S.PortfolioContentSnowflake>
            <S.PortfolioContentSnowflakeWrapper>
              <PortfolioSnowflake
                allItems={portfolioItems}
                selectedKeys={selectedPortfolioKeys}
                showLabels={true}
              />
            </S.PortfolioContentSnowflakeWrapper>
          </S.PortfolioContentSnowflake>
          <S.PortfolioContentMarketWrapper>
            <S.PortfolioContentMarket>
              {portfolioData.market}
            </S.PortfolioContentMarket>
          </S.PortfolioContentMarketWrapper>
        </S.PortfolioContentRight>
      </S.PortfolioContent>

      <S.PortfolioStock>
        {/* <StockResult data={stockResultData} /> */}
      </S.PortfolioStock>
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
