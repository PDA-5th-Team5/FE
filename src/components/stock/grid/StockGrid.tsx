import styled from "styled-components";
import StockCard from "./card/StockCard";
import { StockProps } from "../list/StockList";
import { Item, labelMapping } from "../../../types/snowflakeTypes";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  align-items: start;
  gap: 40px;
`;

const StockGrid = ({ stocks, setStocks, isMyWatchlist }: StockProps) => {
  return (
    <GridContainer>
      {stocks.map((stock) => {
        // 각 주식의 스노우플레이크 데이터가 있다면 Item 배열로 변환
        const snowflakeItems: Item[] = stock.snowflakeS
          ? Object.entries(stock.snowflakeS).map(([key, values]) => ({
              key,
              label: labelMapping[key] ?? key,
              D2Value: values,
              D1Value: values,
            }))
          : [];

        // 각 주식의 스노우플레이크 요소의 키 목록
        const snowflakeSelectedKeys: string[] = stock.snowflakeS
          ? Object.keys(stock.snowflakeS)
          : [];

        return (
          <StockCard
            key={stock.stockId}
            stock={stock}
            stocks={stocks}
            setStocks={setStocks}
            allItems={snowflakeItems}
            selectedKeys={snowflakeSelectedKeys}
            isMyWatchlist={isMyWatchlist}
          />
        );
      })}
    </GridContainer>
  );
};

export default StockGrid;
