import styled from "styled-components";

export const PortfolioPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

export const PortfolioDescription = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 30px;
`;

export const PortfolioContent = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 80px;
`;

export const PortfolioContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 포트폴리오 요약
export const PortfolioSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 767px;
  height: 116px;
  border-radius: 8px;
  background: #1c242e;
  box-sizing: border-box;
  padding: 20px 40px;
`;

export const PortfolioSummaryItemWrapper = styled.div`
  display: flex;
`;

export const PortfolioSummaryItem = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  gap: 16px;
  width: 148px;
  margin-right: 20px;
  box-sizing: border-box;
`;

export const PortfolioSummaryItemLine = styled.div<{ $isFirst?: boolean }>`
  width: 4px;
  height: 49px;
  background-color: ${({ $isFirst }) => ($isFirst ? "#2394df" : "#3E4855")};
  border-radius: 8px;
`;

export const PortfolioSummaryItemData = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 4px;
`;
export const PortfolioSummaryItemDataValue = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

export const PortfolioSummaryItemDataTitle = styled.div`
  color: #a7abae;
  font-size: 12px;
`;

export const PortfolioContentTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const PortfolioLineGraph = styled.div`
  width: 767px;
  height: 348px;
  border-radius: 8px;
  background: #1a222d;
  box-sizing: border-box;
  padding: 20px 40px;
`;

export const PortfolioContentRight = styled.div`
  width: 417px;
  height: 480px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #1c242e;
  box-sizing: border-box;
  padding: 20px 40px;
`;
