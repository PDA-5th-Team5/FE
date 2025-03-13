import * as S from "./PortfolioPage.styled";
import StockResult from "../../components/stock/result/StockResult";
import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
import PortfolioSnowflake from "../../components/snowflake/PortfolioSnowflake";
import LineGraph from "../../components/lineGraph/LineGraph";
// import { Stock } from "../../types/stockType";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getShareSummaryAPI,
  getMySummaryAPI,
  SummaryResponse,
  getSharePortfolioStocksAPI,
  getMyPortfolioStocksAPI,
  SharePortfolioStocksResponse,
  Stock,
} from "../../apis/portfolio";
import { formatMarketCap } from "../../utils/transferUtils";
import { FilterStock } from "../../types/stockTypes";

export interface StockResultData {
  totalCount: number;
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
interface StocksResponse {
  totalCount: number;
  stocks: Stock[];
  portfolioTitle?: string;
  portfolioDescription?: string;
}
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
  const [stocksData, setStocksData] = useState<StocksResponse>({
    totalCount: 0,
    stocks: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  // 공유 포트폴리오 평균값 조회
  useEffect(() => {
    if (num) {
      const portfolioId = parseInt(num);

      // 포트폴리오 요약 정보 로드
      const loadSummary = async () => {
        try {
          const summaryData = isMy
            ? await getMySummaryAPI(num)
            : await getShareSummaryAPI(num);

          if (summaryData.status === 200) {
            setSummary(summaryData.data);
          } else {
            console.log(
              `${isMy ? "나의" : "공유"} 포트폴리오 평균값 조회 실패`
            );
          }
        } catch (error) {
          console.error("API 호출 실패", error);
        }
      };

      // 포트폴리오 종목 정보 로드
      const loadStocks = async () => {
        try {
          setLoading(true);
          console.log("API 호출 시작:", portfolioId, isMy);

          const apiResponse = isMy
            ? await getMyPortfolioStocksAPI(portfolioId)
            : await getSharePortfolioStocksAPI(portfolioId);

          setStocksData(apiResponse);
        } catch (error) {
          console.error(
            `${isMy ? "나의" : "공유"} 포트폴리오 종목 조회 실패`,
            error
          );
        } finally {
          setLoading(false);
        }
      };

      loadSummary();
      loadStocks();
    }
  }, [num, isMy]);

  const portfolioItems = portfolioData
    ? transformPortfolioToItems(portfolioData)
    : [];
  const selectedPortfolioKeys = portfolioItems.map((item) => item.key);

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
                    {formatMarketCap(summary?.avgMarketCap ?? 0)}
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
                    {summary?.avgPer}
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
        <StockResult
          data={stocksData}
          filteredStocksCnt={stocksData.totalCount}
          loading={loading}
        />
      </S.PortfolioStock>
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
