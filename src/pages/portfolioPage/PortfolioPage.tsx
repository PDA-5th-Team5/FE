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
  getPortfolioGraphAPI,
  LineGraphResponse,
  SharePortfolioStocksResponse,
  Stock,
} from "../../apis/portfolio";
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
  const [graphData, setGraphData] = useState<LineGraphResponse | null>(null);
  // 그래프 데이터 로드 함수
  const loadGraphData = async (stockIds: number[], market?: string) => {
    try {
      const response = await getPortfolioGraphAPI(stockIds, market);

      // API 응답을 LineGraph 컴포넌트가 기대하는 형식으로 변환
      const formattedData: LineGraphData = {
        status: 200,
        message: "성공입니다.",
        data: [
          {
            market: response.lineGraph.market,
            price: response.lineGraph.price,
          },
          {
            portfolioTitle: response.lineGraph.portfolioTitle,
            avgClosePrice: response.lineGraph.avgClosePrice,
          },
        ],
      };

      setGraphData(formattedData);
      console.log("그래프ㅡ프프", formattedData);
    } catch (error) {
      console.error("그래프 데이터 로드 실패:", error);
    }
  };

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
          // 종목 ID 목록 추출
          const stockIds = apiResponse.stocks.map((stock) => stock.stockId);

          // 시장 타입 결정 (모든 종목이 같은 시장인 경우 해당 시장 사용, 아니면 "ALL")
          const marketTypes = [
            ...new Set(apiResponse.stocks.map((stock) => stock.marketType)),
          ];
          const market = marketTypes.length === 1 ? marketTypes[0] : "ALL";

          // 그래프 데이터 로드
          await loadGraphData(stockIds, market);
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
            <LineGraph data={graphData} />
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
