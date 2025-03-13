import { useEffect, useState } from "react";
import * as S from "./StockResult.styled";
import ListOnIcon from "../../../assets/images/icons/view/list_on.png";
import ListOffIcon from "../../../assets/images/icons/view/list_off.png";
import GridOnIcon from "../../../assets/images/icons/view/grid_on.png";
import GridOffIcon from "../../../assets/images/icons/view/grid_off.png";
import StockList from "../list/StockList";
import StockGrid from "../grid/StockGrid";
import SortDropdown from "../../sortDropdown/SortDropdown";
import SortKeyIcon from "../../../assets/images/icons/sortKey.png";
import SortDirectionIcon from "../../../assets/images/icons/sortDirection.png";
import { FilterStock } from "../../../types/stockTypes";
import { PulseLoader } from "react-spinners";
import { StockResultData } from "../../../pages/portfolioPage/PortfolioPage";
// StockResult 컴포넌트 Props 정의
interface StockResultProps {
  data: any;
  filteredStocksCnt: number;
  loading: boolean;
}
const StockResult = ({
  data,
  filteredStocksCnt,
  loading,
}: StockResultProps) => {
  const stocksArray = data && data.stocks ? data.stocks : [];

  const [stocks, setStocks] = useState<FilterStock[]>(stocksArray);
  const [view, setView] = useState("list");
  const [sortKey, setSortKey] = useState("시가총액");
  const [sortDirection, setSortDirection] = useState("내림차순");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const handleSortKeyChange = (value: string) => {
    setSortKey(value);
    // TODO API 연결
  };
  const handleSortDirectionChange = (value: string) => {
    setSortDirection(value);
    // TODO API 연결
  };
  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };
  // 북마크 토글 상태 업데이트 함수
  const handleToggleBookmark = (stockId: number, newState: boolean) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.stockId === stockId ? { ...stock, isBookmark: newState } : stock
      )
    );
  };
  useEffect(() => {
    if (data) {
      // 배열인 경우 (첫 번째 API 응답 - 종목 리스트 조회)
      if (Array.isArray(data)) {
        setStocks(data);
      }
      // 객체인 경우 (두 번째 API 응답 - 메인 페이지 조건 검색)
      else if (data.stocks) {
        setStocks(data.stocks);
      }
    }
  }, [data]);

  // 검색 결과 개수 표시
  const totalCount = Array.isArray(data)
    ? filteredStocksCnt
    : data.totalCount || filteredStocksCnt;

  if (loading) {
    return (
      <S.LoadingResultContainer>
        <PulseLoader size={10} color="#2595E0" />
      </S.LoadingResultContainer>
    );
  }
  return (
    <S.StockResultContainer>
      <S.StockResultHeader>
        <S.StockResultTitle>검색 결과 {totalCount}개</S.StockResultTitle>
        <S.StockResultTool>
          {/* 정렬부분 */}
          {/* <S.StockResultSortWrapper>
            <SortDropdown
              options={[
                "시가총액",
                "1주일 대비 수익률",
                "1년 대비 수익률",
                "전일 대비 등락률",
                "PER",
                "부채비율",
              ]}
              selected={sortKey}
              onChange={handleSortKeyChange}
              icon={SortKeyIcon}
              isOpen={openDropdown === "sortKey"}
              onToggle={() => toggleDropdown("sortKey")}
            />
            <SortDropdown
              options={["오름차순", "내림차순"]}
              selected={sortDirection}
              onChange={handleSortDirectionChange}
              icon={SortDirectionIcon}
              isOpen={openDropdown === "sortDirection"}
              onToggle={() => toggleDropdown("sortDirection")}
            />
          </S.StockResultSortWrapper> */}
          <S.StockResultViewWrapper>
            {view === "list" ? (
              <>
                <S.StockResultViewOn>
                  <S.StockResultView src={ListOnIcon} />
                </S.StockResultViewOn>
                <S.StockResultViewOff>
                  <S.StockResultView
                    src={GridOffIcon}
                    onClick={() => {
                      setView("grid");
                    }}
                  />
                </S.StockResultViewOff>
              </>
            ) : (
              <>
                <S.StockResultViewOff>
                  <S.StockResultView
                    src={ListOffIcon}
                    onClick={() => {
                      setView("list");
                    }}
                  />
                </S.StockResultViewOff>
                <S.StockResultViewOn>
                  <S.StockResultView src={GridOnIcon} />
                </S.StockResultViewOn>
              </>
            )}
          </S.StockResultViewWrapper>
        </S.StockResultTool>
      </S.StockResultHeader>
      {stocks.length === 0 ? (
        <S.NoResultContainer>검색 결과가 없습니다</S.NoResultContainer>
      ) : view === "list" ? (
        <StockList stocks={stocks} setStocks={setStocks} />
      ) : (
        <StockGrid stocks={stocks} setStocks={setStocks} />
      )}
    </S.StockResultContainer>
  );
};
export default StockResult;
