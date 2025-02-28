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
      description:
        "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
    },
    {
      id: 2,
      ticker: "A0002",
      name: "하이닉스",
      price: 105000.0,
      change7d: 3.1,
      change1y: 4.2,
      marketCap: 9000,
      per: 17.56,
      debtRatio: 33.49,
      sector: "반도체",
      bookmark: false,
      description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.",
    },
    {
      id: 3,
      ticker: "A0003",
      name: "LG전자",
      price: 1234,
      change7d: 2.5,
      change1y: -7.8,
      marketCap: 3000,
      per: 13.34,
      debtRatio: 28.19,
      sector: "가전",
      bookmark: true,
      description:
        "LG전자는 가전제품과 디스플레이 분야에서 혁신적인 제품을 제공합니다.",
    },
  ]);

  const [view, setView] = useState("grid");

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
          <StockGrid stocks={stocks} onToggle={onToggleBookmark} />
        </>
      )}
    </S.StockResultContainer>
  );
};

export default StockResult;
