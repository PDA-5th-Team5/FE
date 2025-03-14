// import * as S from "./PortfolioPage.styled";
// import StockResult from "../../components/stock/result/StockResult";
// import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
// import PortfolioSnowflake from "../../components/snowflake/PortfolioSnowflake";
// import LineGraph from "../../components/lineGraph/LineGraph";
// import { LineGraphData } from "../../components/lineGraph/LineGraph";

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   getShareSummaryAPI,
//   getMySummaryAPI,
//   SummaryResponse,
//   getSharePortfolioStocksAPI,
//   getMyPortfolioStocksAPI,
//   getPortfolioGraphAPI,
//   Stock,
// } from "../../apis/portfolio";
// import { formatMarketCap } from "../../utils/transferUtils";

// export interface StockResultData {
//   totalCount: number;
//   stockInfos: Stock[];
//   portfolioTitle?: string;
//   portfolioDescription?: string;
// }

// interface PortfolioPageProps {
//   portfolioData?: any;
//   elementsObj?: { [key: string]: number[] };
//   snowflakeItems?: any[];
//   description?: string;
//   isMy?: boolean;
// }

// export interface StocksResponse {
//   totalCount: number;
//   stocks: Stock[];
//   portfolioTitle?: string;
//   portfolioDescription?: string;
// }

// const PortfolioPage = ({ portfolioData, isMy }: PortfolioPageProps) => {
//   const { num } = useParams<{ num: string }>();
//   const [summary, setSummary] = useState<SummaryResponse>();
//   const [stocksData, setStocksData] = useState<StocksResponse>({
//     totalCount: 0,
//     stocks: [],
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [graphData, setGraphData] = useState<LineGraphData>({
//     status: 0,
//     message: "",
//     data: [],
//   });

//   // 그래프 데이터 로드 함수
//   const loadGraphData = async (portfolioId: number, market?: string) => {
//     try {
//       const response = await getPortfolioGraphAPI(portfolioId, market);

//       // API 응답을 LineGraph 컴포넌트가 기대하는 형식으로 변환
//       const formattedData: LineGraphData = {
//         status: 200,
//         message: "성공입니다.",
//         data: [
//           {
//             market: response.lineGraph.market,
//             price: response.lineGraph.price,
//           },
//           {
//             portfolioTitle: response.lineGraph.portfolioTitle,
//             avgClosePrice: response.lineGraph.avgClosePrice,
//           },
//         ],
//       };

//       setGraphData(formattedData);
//       console.log("그래프ㅡ프프", formattedData);
//     } catch (error) {
//       console.error("그래프 데이터 로드 실패:", error);
//     }
//   };

//   // 공유 포트폴리오 평균값 조회
//   useEffect(() => {
//     if (num) {
//       const portfolioId = parseInt(num);

//       // 포트폴리오 요약 정보 로드
//       const loadSummary = async () => {
//         try {
//           const summaryData = isMy
//             ? await getMySummaryAPI(num)
//             : await getShareSummaryAPI(num);

//           if (summaryData.status === 200) {
//             setSummary(summaryData.data);
//           } else {
//             console.log(
//               `${isMy ? "나의" : "공유"} 포트폴리오 평균값 조회 실패`
//             );
//           }
//         } catch (error) {
//           console.error("API 호출 실패", error);
//         }
//       };

//       // 포트폴리오 종목 정보 로드
//       const loadStocks = async () => {
//         try {
//           setLoading(true);
//           console.log("API 호출 시작:", portfolioId, isMy);

//           const apiResponse = isMy
//             ? await getMyPortfolioStocksAPI(portfolioId)
//             : await getSharePortfolioStocksAPI(portfolioId);

//           setStocksData(apiResponse);
//           // 종목 ID 목록 추출
//           //  const stockIds = apiResponse.stocks.map((stock) => stock.stockId);

//           // 시장 타입 결정 (모든 종목이 같은 시장인 경우 해당 시장 사용, 아니면 "ALL")
//           const marketTypes = [
//             ...new Set(apiResponse.stocks.map((stock) => stock.marketType)),
//           ];
//           const market = marketTypes.length === 1 ? marketTypes[0] : "ALL";

//           // 그래프 데이터 로드
//           await loadGraphData(portfolioId, market);
//         } catch (error) {
//           console.error(
//             `${isMy ? "나의" : "공유"} 포트폴리오 종목 조회 실패`,
//             error
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadSummary();
//       loadStocks();
//     }
//   }, [num, isMy]);

//   const portfolioItems = portfolioData
//     ? transformPortfolioToItems(portfolioData)
//     : [];
//   const selectedPortfolioKeys = portfolioItems.map((item) => item.key);

//   return (
//     <S.PortfolioPageContainer>
//       <S.PortfolioDescription>{portfolioData.title}</S.PortfolioDescription>

//       <S.PortfolioContent>
//         <S.PortfolioContentLeft>
//           <S.PortfolioSummary>
//             <S.PortfolioContentTitle>포트폴리오 요약</S.PortfolioContentTitle>
//             <S.PortfolioSummaryItemWrapper>
//               {/* 이렇게가 하나입니다! */}
//               <S.PortfolioSummaryItem>
//                 <S.PortfolioSummaryItemLine $isFirst={true} />
//                 <S.PortfolioSummaryItemData>
//                   <S.PortfolioSummaryItemDataValue>
//                     {/* 50조 */}
//                     {formatMarketCap(summary?.avgMarketCap ?? 0)}
//                   </S.PortfolioSummaryItemDataValue>
//                   <S.PortfolioSummaryItemDataTitle>
//                     평균 시가총액
//                   </S.PortfolioSummaryItemDataTitle>
//                 </S.PortfolioSummaryItemData>
//               </S.PortfolioSummaryItem>

//               {/* 이렇게가 하나입니다! */}
//               <S.PortfolioSummaryItem>
//                 <S.PortfolioSummaryItemLine />
//                 <S.PortfolioSummaryItemData>
//                   <S.PortfolioSummaryItemDataValue>
//                     {/* 23.08 */}
//                     {summary?.avgPer}
//                   </S.PortfolioSummaryItemDataValue>
//                   <S.PortfolioSummaryItemDataTitle>
//                     평균 PER
//                   </S.PortfolioSummaryItemDataTitle>
//                 </S.PortfolioSummaryItemData>
//               </S.PortfolioSummaryItem>

//               {/* 이렇게가 하나입니다! */}
//               <S.PortfolioSummaryItem>
//                 <S.PortfolioSummaryItemLine />
//                 <S.PortfolioSummaryItemData>
//                   <S.PortfolioSummaryItemDataValue>
//                     {/* 25.01% */}
//                     {summary?.avgDebt}%
//                   </S.PortfolioSummaryItemDataValue>
//                   <S.PortfolioSummaryItemDataTitle>
//                     평균 부채비율
//                   </S.PortfolioSummaryItemDataTitle>
//                 </S.PortfolioSummaryItemData>
//               </S.PortfolioSummaryItem>

//               {/* 이렇게가 하나입니다! */}
//               <S.PortfolioSummaryItem>
//                 <S.PortfolioSummaryItemLine />
//                 <S.PortfolioSummaryItemData>
//                   <S.PortfolioSummaryItemDataValue>
//                     {/* 2.08 */}
//                     {summary?.avgDividend}%
//                   </S.PortfolioSummaryItemDataValue>
//                   <S.PortfolioSummaryItemDataTitle>
//                     평균 배당
//                   </S.PortfolioSummaryItemDataTitle>
//                 </S.PortfolioSummaryItemData>
//               </S.PortfolioSummaryItem>
//             </S.PortfolioSummaryItemWrapper>
//           </S.PortfolioSummary>
//           <S.PortfolioLineGraph>
//             <S.PortfolioContentTitle>
//               포트폴리오 vs 시장 그래프 비교
//             </S.PortfolioContentTitle>

//             <LineGraph data={graphData} />
//           </S.PortfolioLineGraph>
//         </S.PortfolioContentLeft>
//         <S.PortfolioContentRight>
//           <S.PortfolioContentTitle>
//             포트폴리오 Snowflake
//             {/* //   {snowflakeItems} */}
//           </S.PortfolioContentTitle>
//           <S.PortfolioContentSnowflake>
//             <S.PortfolioContentSnowflakeWrapper>
//               <PortfolioSnowflake
//                 allItems={portfolioItems}
//                 selectedKeys={selectedPortfolioKeys}
//                 showLabels={true}
//               />
//             </S.PortfolioContentSnowflakeWrapper>
//           </S.PortfolioContentSnowflake>
//           <S.PortfolioContentMarketWrapper>
//             <S.PortfolioContentMarket>
//               {portfolioData.market}
//             </S.PortfolioContentMarket>
//           </S.PortfolioContentMarketWrapper>
//         </S.PortfolioContentRight>
//       </S.PortfolioContent>

//       <S.PortfolioStock>
//         <StockResult
//           data={stocksData}
//           filteredStocksCnt={stocksData.totalCount}
//           loading={loading}
//         />
//       </S.PortfolioStock>
//     </S.PortfolioPageContainer>
//   );
// };

// export default PortfolioPage;

// PortfolioPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getShareSummaryAPI,
  getMySummaryAPI,
  SummaryResponse,
  getSharePortfolioStocksAPI,
  getMyPortfolioStocksAPI,
  getPortfolioGraphAPI,
  Stock,
} from "../../apis/portfolio";
import { formatMarketCap } from "../../utils/transferUtils";
import * as S from "./PortfolioPage.styled";
import StockResult from "../../components/stock/result/StockResult";
import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
import PortfolioSnowflake from "../../components/snowflake/PortfolioSnowflake";
import LineGraph from "../../components/lineGraph/LineGraph";
import { LineGraphData } from "../../components/lineGraph/LineGraph";
import { useInView } from "react-intersection-observer";

export interface StocksResponse {
  totalCount: number;
  stocks: Stock[];
  portfolioTitle?: string;
  portfolioDescription?: string;
}

interface PortfolioPageProps {
  portfolioData?: any;
  elementsObj?: { [key: string]: number[] };
  snowflakeItems?: any[];
  description?: string;
  isMy?: boolean;
  pageName: "main" | "my" | "share";
}

const PortfolioPage = ({
  portfolioData,
  isMy,
  pageName,
}: PortfolioPageProps) => {
  const { num } = useParams<{ num: string }>();
  const portfolioId = num ? parseInt(num) : null;

  const [summary, setSummary] = useState<SummaryResponse>();
  const [stocksData, setStocksData] = useState<StocksResponse>({
    totalCount: 0,
    stocks: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [graphData, setGraphData] = useState<LineGraphData>({
    status: 0,
    message: "",
    data: [],
  });

  // 무한 스크롤을 위한 상태들
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const { ref, inView } = useInView();

  // 그래프 데이터 로드 함수
  const loadGraphData = async (portfolioId: number, market?: string) => {
    try {
      const response = await getPortfolioGraphAPI(portfolioId, market);
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
    } catch (error) {
      console.error("그래프 데이터 로드 실패:", error);
    }
  };

  // 포트폴리오 요약 및 종목 데이터 로드 (초기 로딩 및 무한 스크롤 적용)
  useEffect(() => {
    if (num && portfolioId) {
      // 요약 데이터 로드
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

      // 종목 데이터 로드 함수 (페이지 번호를 인자로 받음)
      const loadStocks = async (currentPage: number) => {
        try {
          if (currentPage === 0) {
            setLoading(true);
          } else {
            setIsLoadingMore(true);
          }
          const apiResponse = isMy
            ? await getMyPortfolioStocksAPI(portfolioId, currentPage)
            : await getSharePortfolioStocksAPI(portfolioId, currentPage);
          if (currentPage === 0) {
            setStocksData(apiResponse);
          } else {
            setStocksData((prev) => ({
              ...apiResponse,
              stocks: [...prev.stocks, ...apiResponse.stocks],
            }));
          }
          if (apiResponse.stocks.length === 0) {
            setIsLast(true);
          }
        } catch (error) {
          console.error(
            `${isMy ? "나의" : "공유"} 포트폴리오 종목 조회 실패`,
            error
          );
        } finally {
          if (currentPage === 0) {
            setLoading(false);
          } else {
            setIsLoadingMore(false);
          }
        }
      };

      loadSummary();
      // 초기 데이터 로드 (페이지 0)
      setPage(0);
      setIsLast(false);
      loadStocks(0);
      // 그래프 데이터 로드 (market은 필요에 따라 "ALL" 등으로 설정)
      loadGraphData(portfolioId, "ALL");
    }
  }, [num, isMy, portfolioId]);

  // 무한 스크롤: Sentinel 요소(inView)가 화면에 보이면 다음 페이지 로드
  useEffect(() => {
    if (inView && !isLoadingMore && !isLast && !loading) {
      const nextPage = page + 1;
      loadMoreStocks(nextPage);
      setPage(nextPage);
    }
  }, [inView]);

  const loadMoreStocks = async (nextPage: number) => {
    if (!portfolioId) return;
    try {
      const apiResponse = isMy
        ? await getMyPortfolioStocksAPI(portfolioId, nextPage)
        : await getSharePortfolioStocksAPI(portfolioId, nextPage);
      if (apiResponse.stocks.length === 0) {
        setIsLast(true);
      } else {
        setStocksData((prev) => ({
          ...apiResponse,
          stocks: [...prev.stocks, ...apiResponse.stocks],
        }));
      }
    } catch (error) {
      console.error("추가 종목 로드 실패:", error);
    }
  };

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
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine $isFirst={true} />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {formatMarketCap(summary?.avgMarketCap ?? 0)}
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 시가총액
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {summary?.avgPer}
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 PER
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    {summary?.avgDebt}%
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 부채비율
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
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
          loading={loading || isLoadingMore}
          ref={ref}
          pageName={pageName}
        />
        {/* 무한 스크롤을 위한 감지 요소 */}
        {pageName === "my" && <div ref={ref} />}
      </S.PortfolioStock>
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
