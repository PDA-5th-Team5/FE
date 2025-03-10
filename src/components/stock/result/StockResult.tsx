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

// StockResult 컴포넌트 Props 정의
interface StockResultProps {
  data: FilterStock[];
  filteredStocksCnt: number;
}

const StockResult = ({ data, filteredStocksCnt }: StockResultProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setStocks(data);
      setIsLoading(false);
    }
  }, [data]);


  const [stocks, setStocks] = useState<FilterStock[]>(data);
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

  return (
    <S.StockResultContainer>
      <S.StockResultHeader>
        <S.StockResultTitle>검색 결과 {filteredStocksCnt}개</S.StockResultTitle>
        <S.StockResultTool>
          <S.StockResultSortWrapper>
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
          </S.StockResultSortWrapper>
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

      {view === "list" ? (
        <>
          <StockList
            stocks={data}
            setStocks={setStocks}
            onToggleBookmark={handleToggleBookmark}
          />
        </>
      ) : (
        <>
          <StockGrid
            stocks={data}
            setStocks={setStocks}
            onToggleBookmark={handleToggleBookmark}
          />
        </>
      )}
    </S.StockResultContainer>
  );
};

export default StockResult;
