import styled from "styled-components";
import StockCard from "./card/StockCard";
import { StockProps } from "../list/StockList";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  align-items: start;
  gap: 40px;
`;

const StockGrid = ({ stocks, setStocks }: StockProps) => {
  return (
    <GridContainer>
      {stocks.map((stock) => (
        <StockCard stock={stock} stocks={stocks} setStocks={setStocks} />
      ))}
    </GridContainer>
  );
};
export default StockGrid;
