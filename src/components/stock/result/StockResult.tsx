import { FC, useEffect, useState } from "react";
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
import { Stock } from "../../../types/stockTypes";

export interface StockResultData {
  stockCnt: number;
  stockInfos: Stock[];
  portfolioTitle?: string;
  portfolioDescription?: string;
}

// StockResult 컴포넌트 Props 정의
interface StockResultProps {
  data: StockResultData;
}

const StockResult = ({ data }: StockResultProps) => {
  const [stocks, setStocks] = useState<Stock[]>(data.stockInfos);
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

  return (
    <S.StockResultContainer>
      <S.StockResultHeader>
        <S.StockResultTitle>검색 결과 1,234개</S.StockResultTitle>
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
          <StockList stocks={stocks} setStocks={setStocks} />
        </>
      ) : (
        <>
          <StockGrid stocks={stocks} setStocks={setStocks} />
        </>
      )}
    </S.StockResultContainer>
  );
};

export default StockResult;
