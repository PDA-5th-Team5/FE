import styled from "styled-components";

export const StockPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 0;
`;

export const StockInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 287px;
  border-radius: 8px;
  background: #1b212d;
  padding: 32px 44px;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const StockInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StockInfoLeft = styled.div`
  display: flex;
  gap: 28px;
`;

export const StockInfoImg = styled.img`
  width: 120px;
  height: 120px;
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StockInfoSector = styled.div`
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  background: #262f3e;
  padding: 4px 16px;
  width: fit-content;
`;

export const StockInfoName = styled.div`
  color: #fff;
  font-size: 36px;
  font-weight: 700;
`;

export const StockInfoWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
export const StockInfoMarket = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const StockInfoTicker = styled.div`
  color: #fff;
  font-size: 16px;
`;

export const StockInfoRight = styled.div`
  background-color: pink;
`;

export const StockInfoBottom = styled.div`
  display: flex;
  gap: 78px;
`;

export const StockInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StockInfoTitle = styled.div`
  color: #c8c9cb;
  font-size: 12px;
`;
export const StockInfoContent = styled.div`
  color: #fff;
  font-size: 20px;
`;

export const StockInfoNum = styled.div<{ $isPositive: boolean }>`
  color: ${({ $isPositive }) => ($isPositive ? "#E74142" : "#2D7AFF")};
  font-size: 20px;
`;
