import styled from "styled-components";

export const StockResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const StockResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const StockResultTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export const StockResultTool = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`;

export const StockResultSortWrapper = styled.div`
  display: flex;
  gap: 28px;
`;

export const StockResultSort = styled.div`
  color: #babbbd;
  font-size: 12px;
`;

export const StockResultViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const StockResultView = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const StockResultViewOn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #252e42;
  background: #192338;
  cursor: pointer;
`;

export const StockResultViewOff = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 32px;
`;
