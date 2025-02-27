import styled from "styled-components";
import StockCard from "./card/StockCard";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  justify-content: space-between;
  align-items: start;
  gap: 40px;
`;

const StockGrid = () => {
  return (
    <GridContainer>
      <StockCard />
      <StockCard />
      <StockCard />
      <StockCard />
      <StockCard />
    </GridContainer>
  );
};
export default StockGrid;
