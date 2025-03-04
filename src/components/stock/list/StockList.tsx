import * as S from "./StockList.styled";
import Example from "../../../assets/images/example.png";
import Bookmark from "../../bookmark/Bookmark";
import { useNavigate } from "react-router-dom";
import { Stock } from "../../../types/stockTypes";
import Snowflake from "../../snowflake/Snowflake";
import { labelMapping } from "../../../types/snowflakeTypes";

export interface StockProps {
  stocks: Stock[];
  onToggle: (id: number) => void;
}

const StockList = ({ stocks, onToggle }: StockProps) => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/stock/${id}`);
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
          const snowflakeItems = stock.snowFlake
            ? Object.entries(stock.snowFlake.elements).map(([key, values]) => ({
                key,
                label: labelMapping[key] ?? key,
                D2Value: values[1],
                // D1Value: values[0],
              }))
            : [];

          // 각 주식의 스노우플레이크 요소의 키 목록
          const snowflakeSelectedKeys = stock.snowFlake
            ? Object.keys(stock.snowFlake.elements)
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
                  {stock.snowFlake && (
                    <Snowflake
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
              <td>₩{stock.currentPrice}</td>

              <S.ChangeTd $isPositive={stock["1WeekFluctuationRate"] >= 0}>
                {stock["1WeekFluctuationRate"]}
              </S.ChangeTd>

              <S.ChangeTd $isPositive={stock["1YearFluctuationRate"] >= 0}>
                {stock["1YearFluctuationRate"]}%
              </S.ChangeTd>
              <td>{stock.marketCap}</td>
              <td>{stock.per}</td>
              <td>{stock.debtRate}%</td>
              <td>{stock.sector}</td>
              <td onClick={(e) => e.stopPropagation}>
                <S.BookmarkWrapper>
                  <Bookmark
                    isBookmarked={stock.isBookmark}
                    onToggle={() => onToggle(stock.stockId)}
                  />
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
