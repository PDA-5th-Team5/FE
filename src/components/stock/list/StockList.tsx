import * as S from "./StockList.styled";
import Bookmark from "../../bookmark/Bookmark";
import { useNavigate } from "react-router-dom";
import { FilterStock } from "../../../types/stockTypes";
import { labelMapping } from "../../../types/snowflakeTypes";
import StockSnowflake from "../../snowflake/StockSnowflake";

export interface StockProps {
  stocks: FilterStock[];
  setStocks: React.Dispatch<React.SetStateAction<FilterStock[]>>;
  isMyWatchlist?: boolean;
}

const StockList = ({ stocks }: StockProps) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/stock/${id}`);
  };

  // 시장가치를 변환하는 함수 (억 단위 -> 조 단위 변환)
  const formatMarketCap = (marketCap: number): string => {
    // 1조 = 10000억
    if (marketCap >= 10000) {
      return `${(marketCap / 10000).toFixed(2)}조`;
    }
    return `${marketCap.toLocaleString()}억`;
  };

  return (
    <S.StyledTable>
      <thead>
        <tr>
          <th></th>
          <th>회사</th>
          <th>현재가</th>
          <th>7일 변동률</th>
          <th>1년 변동률</th>
          <th>시가총액</th>
          <th>PER</th>
          <th>부채비율</th>
          <th>섹터</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          // 각 주식의 스노우플레이크 데이터가 있다면 Item 배열로 변환
          const snowflakeItems = stock.snowflakeS
            ? Object.entries(stock.snowflakeS).map(([key, values]) => ({
                key,
                label: labelMapping[key] ?? key,
                D2Value: values,
                D1Value: values,
              }))
            : [];

          // 각 주식의 스노우플레이크 요소의 키 목록
          const snowflakeSelectedKeys = stock.snowflakeS
            ? Object.keys(stock.snowflakeS)
            : [];

          return (
            <tr
              key={stock.stockId}
              onClick={() => {
                handleRowClick(stock.stockId);
              }}
            >
              <td>
                <S.SnowflakeWrapper>
                  {stock.snowflakeS && (
                    <StockSnowflake
                      allItems={snowflakeItems}
                      selectedKeys={snowflakeSelectedKeys}
                      showLabels={false}
                    />
                  )}
                </S.SnowflakeWrapper>
              </td>
              <td>
                <S.StockListTicker>{stock.ticker}</S.StockListTicker>
                <S.StockListName>{stock.companyName}</S.StockListName>
              </td>
              <td>{stock.currentPrice.toLocaleString()}원</td>

              <S.ChangeTd $isPositive={stock.weekRateChange >= 0}>
                {stock.weekRateChange}%
              </S.ChangeTd>

              <S.ChangeTd $isPositive={stock.yearRateChange >= 0}>
                {stock.yearRateChange}%
              </S.ChangeTd>
              <td>{formatMarketCap(stock.marketCap ?? 0)}</td>
              <td>{stock.per}</td>
              <td>{stock.lbltRate}%</td>
              <td>{stock.sector}</td>
              <td onClick={(e) => e.stopPropagation}>
                <S.BookmarkWrapper>
                  <Bookmark stockId={stock.stockId} isBookmarked={stock.fav} />
                </S.BookmarkWrapper>
              </td>
            </tr>
          );
        })}
      </tbody>
    </S.StyledTable>
  );
};

export default StockList;
