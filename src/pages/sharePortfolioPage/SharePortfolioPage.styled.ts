import styled from "styled-components";

export const SharePortfolioListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0px;
`;

export const SharePortfolioListTitle = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 700;
`;

export const SharePortfolioListSubTitle = styled.div`
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
`;

export const SharePortfolioListHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
`;

export const SharePortfolioListCount = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
`;

export const SharePortfolioList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  align-items: start;
  gap: 40px;
  margin-top: 20px;
`;
