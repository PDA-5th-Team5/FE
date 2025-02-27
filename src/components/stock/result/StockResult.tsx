import { FC, useState } from "react";
import * as S from "./StockResult.styled";
import ListOnIcon from "../../../assets/images/icons/view/list_on.png";
import ListOffIcon from "../../../assets/images/icons/view/list_off.png";
import GridOnIcon from "../../../assets/images/icons/view/grid_on.png";
import GridOffIcon from "../../../assets/images/icons/view/grid_off.png";
import StockList, { Stock } from "../list/StockList";
import StockGrid from "../grid/StockGrid";

const StockResult: FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: 1,
      ticker: "A0001",
      name: "삼성전자",
      price: 58900.0,
      change7d: 5.2,
      change1y: -9.8,
      marketCap: 4500,
      per: 15.22,
      debtRatio: 33.49,
      sector: "반도체",
      bookmark: false,
    },
    {
      id: 2,
      ticker: "A0001",
      name: "삼성전자",
      price: 58900.0,
      change7d: 5.2,
      change1y: -9.8,
      marketCap: 4500,
      per: 15.22,
      debtRatio: 33.49,
      sector: "섹터들어갈부분",
      bookmark: false,
    },
    {
      id: 3,
      ticker: "A0001",
      name: "삼성전자",
      price: 1234,
      change7d: 5.2,
      change1y: -9.8,
      marketCap: 4500,
      per: 15.22,
      debtRatio: 33.49,
      sector: "반도체",
      bookmark: true,
    },
  ]);

  const [view, setView] = useState("list");

  const onToggleBookmark = (id: number) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.id === id ? { ...stock, bookmark: !stock.bookmark } : stock
      )
    );
  };

  return (
    <S.StockResultContainer>
      <S.StockResultHeader>
        <S.StockResultTitle>검색 결과 1,234개</S.StockResultTitle>
        <S.StockResultTool>
          <S.StockResultSortWrapper>
            <S.StockResultSort>시가총액</S.StockResultSort>
            <S.StockResultSort>오름차순</S.StockResultSort>
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
          <StockList stocks={stocks} onToggle={onToggleBookmark} />
        </>
      ) : (
        <>
          <StockGrid />
        </>
      )}
    </S.StockResultContainer>
  );
};

export default StockResult;
