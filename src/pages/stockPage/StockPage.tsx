import Bookmark from "../../components/bookmark/Bookmark";
import * as S from "./StockPage.styled";
import Comment from "../../components/comment/Comment";
import CandleChart from "./components/candleChart/CandleChart";
import LineGraphStock from "../../components/lineGraph/LineGraphStock";
import { useEffect, useState, useRef } from "react";
import { StockDetail } from "../../types/stockTypes";
//import { stockLineGraph } from "../stockPage/dummy";
import {
  Item,
  labelMapping,
  SnowflakeSElements,
} from "../../types/snowflakeTypes";
import StockSnowflake from "../../components/snowflake/StockSnowflake";
import {
  getStockInfo,
  // StockInfoResponse,
  // addToWatchlist,
  // removeFromWatchlist,
  getCompetitorsAPI,
  getLineGraphAPI,
  LineGraphResponse,
  getCommentsAPI,
  CommentsResponse,
  deleteCommentAPI,
  editCommentAPI,
  Competitors,
} from "../../apis/stock";
import { useNavigate, useParams } from "react-router-dom";
import { formatMarketCapS } from "../../utils/transferUtils";
// import { isNumber } from "chart.js/helpers";

// const IMAGE_BASE = "../../assets/images/stocks/";

export interface StockDataType {
  status?: number;
  message: string;
  data: {
    stockInfo: StockDetail;
    snowflakeS: SnowflakeSElements;
  };
}

// const stockLineGraph = [
//   { date: "2023-01", value: 100 },
//   { date: "2023-02", value: 120 },
// ];
const StockPage = () => {
  const { num } = useParams<{ num: string }>();
  const stockId = num ? parseInt(num, 10) : 1;
  // console.log(num);

  const [stockData, setStockData] = useState<StockDataType | null>(null);
  const [lineGraphData, setLineGraphData] = useState<LineGraphResponse | null>(
    null
  );
  const [lineGraphLoading, setLineGraphLoading] = useState(true);
  const [lineGraphError, setLineGraphError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [competitors, setCompetitors] = useState<Competitors[]>([]);
  // const [competitorsLoading, setCompetitorsLoading] = useState(true);
  // const [competitorsError, setCompetitorsError] = useState<string | null>(null);

  const [commentsData, setCommentsData] = useState<CommentsResponse>({
    comments: [],
  });
  // const [page, setPage] = useState(1);
  // const size = 10;
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const navigate = useNavigate();
  const scrollRef = useRef(0);

  // 이거 line 그래프 구현하면서 삭제해주세요.
  console.log(lineGraphData);
  console.log(lineGraphData);

  const fetchComments = async (): Promise<CommentsResponse> => {
    // let result: CommentsResponse;
    scrollRef.current = window.scrollY;
    try {
      // setIsLoading(true);
      const data = await getCommentsAPI(stockId);
      setCommentsData(data);
      // result = data;
      return data;
    } catch (error) {
      console.error("댓글 로딩 실패:", error);
      // result = { comments: [] };
      return { comments: [] };
      // setCommentsData(result);
    } finally {
      // setIsLoading(false);
      setTimeout(() => window.scrollTo(0, scrollRef.current), 0);
    }
    // return result;
  };

  //1. 댓글 조회
  useEffect(() => {
    fetchComments();
  }, [stockId]);

  //2. 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteCommentAPI(stockId, commentId);
        alert("댓글이 삭제되었습니다.");
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
      // setOpenDropdownId(null);
    }
  };

  //3. 댓글 수정
  const handleEdit = (commentId: number, currentContent: string) => {
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditContent("");
    } else {
      setEditingCommentId(commentId);
      setEditContent(currentContent);
    }
  };

  const handleCancelEdit = () => {
    console.log("수정");

    setEditingCommentId(null);
    setEditContent("");
  };
  const handleSaveEdit = async (commentId: number) => {
    console.log("ad");

    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await editCommentAPI(stockId, commentId, editContent);
      alert("댓글이 수정되었습니다.");
      setEditingCommentId(null);
      setEditContent("");
      fetchComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다. 다시 시도해주세요.");
    }
    setOpenDropdownId(null);
  };

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        setIsLoading(true);
        // setError(null);

        const response = await getStockInfo(stockId);

        // API 응답을 StockDataType 형식으로 변환
        const transformedData: StockDataType = {
          status: response.status,
          message: response.message,
          data: {
            stockInfo: {
              ...response.data.stockInfo,
              "1WeekProfitRate": Number(
                (response.data.stockInfo.weekRateChange * 100).toFixed(0)
              ),
              "1YearProfitRate": Number(
                (response.data.stockInfo.yearRateChange * 100).toFixed(0)
              ),
              dividendYeild: response.data.snowflakeS.dividendYield || 0,

              isBookmark: response.data.stockInfo.fav,
            },
            snowflakeS: {
              per: response.data.snowflakeS.per,
              lbltRate: response.data.snowflakeS.lbltRate,
              marketCap: response.data.snowflakeS.marketCap,
              dividendYield: response.data.snowflakeS.dividendYield,
              foreignerRatio: response.data.snowflakeS.foreignerRatio,
            },
          },
        };

        setStockData(transformedData);
      } catch (error) {
        console.error("주식 정보 로딩 실패:", error);
        // setError("주식 정보를 불러오는데 실패했습니다.");
        // 에러 시 알림 (선택사항)
        // toast.error("주식 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockInfo();
  }, [stockId]);

  useEffect(() => {
    const fetchLineGraphData = async () => {
      try {
        setLineGraphLoading(true);
        setLineGraphError(null);

        const response = await getLineGraphAPI(stockId);
        console.log("여기확인", response.data);

        setLineGraphData(response);
      } catch (error) {
        console.error("라인그래프 데이터 로딩 실패:", error);
        setLineGraphError("라인그래프 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLineGraphLoading(false);
      }
    };
    fetchLineGraphData();
  }, [stockId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stockId]);
  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        // setCompetitorsLoading(true);
        // setCompetitorsError(null);

        const response = await getCompetitorsAPI(stockId);

        if (response.status === 200) {
          setCompetitors(response.data.competitors);
        } else {
          console.error(
            response.message || "경쟁사 정보를 불러오는데 실패했습니다."
          );
          // setCompetitorsError(
          //   response.message || "경쟁사 정보를 불러오는데 실패했습니다."
          // );
        }
      } catch (error) {
        console.error("경쟁사 정보 로딩 실패:", error);
        // setCompetitorsError("경쟁사 정보를 불러오는데 실패했습니다.");
      } finally {
        // setCompetitorsLoading(false);
      }
    };

    // 주식 정보가 로드된 후 경쟁사 정보를 가져옴
    if (!isLoading && stockData) {
      fetchCompetitors();
    }
  }, [stockId, isLoading, stockData]);

  // 순서
  const snowflakeOrder = [
    "marketCap",
    "per",
    "lbltRate",
    "dividendYield",
    "divYield",
    "foreignerRatio",
  ];

  const sortSnowflakeData = (items: Item[], order: string[]) => {
    const sortedItems = order
      .map((key) => items.find((item) => item.key === key))
      .filter((item): item is Item => !!item);
    const sortedSelectedKeys = order.filter((key) =>
      items.some((item) => item.key === key)
    );
    return { sortedItems, sortedSelectedKeys };
  };

  const snowflakeItems: Item[] = stockData?.data?.snowflakeS
    ? Object.entries(stockData.data.snowflakeS).map(([key, values]) => ({
        key,
        label: labelMapping[key] ?? key,
        D2Value: values,
        D1Value: values,
      }))
    : [];

  const { sortedItems, sortedSelectedKeys } = sortSnowflakeData(
    snowflakeItems,
    snowflakeOrder
  );

  // const handleToggleBookmark = async (stockId: number, newState: boolean) => {
  //   try {
  //     // newState가 true면 추가, false면 삭제
  //     const response = newState
  //       ? await addToWatchlist(stockId)
  //       : await removeFromWatchlist(stockId);

  //     // API 호출이 성공하면 상태 업데이트
  //     if (response.status === 200) {
  //       setStockData((prevData) => {
  //         if (!prevData) return null;
  //         return {
  //           ...prevData,
  //           data: {
  //             ...prevData.data,
  //             stockInfo: {
  //               ...prevData.data.stockInfo,
  //               isBookmark: newState,
  //             },
  //           },
  //         };
  //       });
  //     } else {
  //       // 실패 시 에러 처리
  //       console.error(
  //         `관심종목 ${newState ? "추가" : "삭제"} 실패:`,
  //         response.message
  //       );
  //       // 필요하다면 여기에 알림 추가 (예: toast 메시지)
  //     }
  //   } catch (error) {
  //     console.error("API 호출 오류:", error);
  //     // 필요하다면 여기에 알림 추가
  //   }
  // };
  if (isLoading || !stockData) {
    return <div>로딩 중...</div>;
  }
  const competitorSnowflakeData = competitors.map((competitor) => {
    const items: Item[] = Object.entries(competitor.snowflakeS).map(
      ([key, value]) => ({
        key,
        label: labelMapping[key] ?? key,
        D1Value: value as number,
        D2Value: value as number,
      })
    );
    return { competitor, items };
  });

  return (
    <S.StockPageContainer>
      <S.StockInfoContainer>
        <S.StockInfoTop>
          <S.StockInfoLeft>
            <S.StockInfoImg
              src={`/stocks/${stockData.data.stockInfo.ticker}.png`}
              alt={`Stock Logo ${stockData.data.stockInfo.ticker}`}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = "/stocks/default.png";
              }}
            />
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
              isBookmarked={stockData.data.stockInfo.isBookmark ?? false}
            />
          </S.StockInfoRight>
        </S.StockInfoTop>
        <S.StockInfoBottom>
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>현재가</S.StockInfoTitle>
            <S.StockInfoContent>
              {stockData.data.stockInfo.currentPrice
                ? stockData.data.stockInfo.currentPrice.toLocaleString()
                : "-"}
              원
            </S.StockInfoContent>
          </S.StockInfoItem>
          {/* ------- */}
          {/* 아이템 하나 */}
          <S.StockInfoItem>
            <S.StockInfoTitle>시가총액</S.StockInfoTitle>
            <S.StockInfoContent>
              {formatMarketCapS(stockData.data.stockInfo.marketCap ?? "")}
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
                {stockData.data.stockInfo.eps
                  ? stockData.data.stockInfo.eps.toLocaleString()
                  : "-"}
                원
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
                {stockData.data.stockInfo.bps
                  ? stockData.data.stockInfo.bps.toLocaleString()
                  : "-"}
                원
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

            {/* ------- */}
          </S.StockOutlineRight>
        </S.StockOutline>
        <S.StockSnowflake>
          <StockSnowflake
            allItems={sortedItems}
            selectedKeys={sortedSelectedKeys}
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
          {competitorSnowflakeData.map(({ competitor, items }, index) => {
            const { sortedItems, sortedSelectedKeys } = sortSnowflakeData(
              items,
              snowflakeOrder
            );

            return (
              <S.StockCompetitorItem
                key={index}
                onClick={() => navigate(`/stock/${competitor.stockId}`)}
                style={{ cursor: "pointer" }}
              >
                {/* 스노우플레이크 차트 */}
                <S.StockSnowflakeWrapper>
                  <StockSnowflake
                    allItems={sortedItems}
                    selectedKeys={sortedSelectedKeys}
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
            );
          })}
        </S.StockCompetitorItemContainer>
      </S.StockCompetitor>

      <S.StockLineGraph>
        <S.Title>라인그래프</S.Title>
        {lineGraphLoading ? (
          <div>라인그래프 로딩 중...</div>
        ) : lineGraphError ? (
          <div>라인그래프 로드 실패: {lineGraphError}</div>
        ) : (
          <LineGraphStock data={lineGraphData} />
        )}
      </S.StockLineGraph>

      <S.StockComments>
        <Comment
          data={commentsData}
          handleDelete={handleDelete}
          handleSaveEdit={handleSaveEdit}
          handleEdit={handleEdit}
          handleCancelEdit={handleCancelEdit}
          editingCommentId={editingCommentId}
          editContent={editContent}
          setEditContent={setEditContent}
          fetchComments={fetchComments}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
      </S.StockComments>
    </S.StockPageContainer>
  );
};

export default StockPage;
