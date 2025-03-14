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
  gap: 12px;
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

export const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #8b8d91;
  font-size: 14px;
`;

export const LoadingResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

export const Scroll = styled.div<{ $isScroll: boolean }>`
  /* overflow-y: ${(props) => (props.$isScroll ? "none" : "auto")}; */
  ${(props) =>
    props.$isScroll
      ? `
         max-height: 1000px;
         overflow-y: auto;
         &::-webkit-scrollbar {
           width: 8px;
         }
         &::-webkit-scrollbar-track {
           background: #272e3b;
           border-radius: 4px;
         }
         &::-webkit-scrollbar-thumb {
           background: #8b8c90;
           border-radius: 4px;
         }
      `
      : `
         overflow-y: hidden;
      `}
`;
