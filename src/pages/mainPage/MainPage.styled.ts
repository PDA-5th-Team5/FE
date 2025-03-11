import styled from "styled-components";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
  gap: 24px;
`;

// 추천 필터
export const MainPageBox = styled.div`
  display: flex;
  border-radius: 8px;
  background: #1b212d;
  padding: 20px;
`;

export const MainPageTabContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainPageRecommendedFilterList = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 20px;

  /* 가로스크롤 */
  width: 1160px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

// 필터 설정
export const MainPageFilterContainer = styled.div`
  width: 100%;
  height: 634px;
  display: flex;
  gap: 28px;
  justify-content: space-between;
`;

// 1. snowflake
export const MainPageSnowflakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* width: 520px;
  height: 100%; */
  margin-top: 20px;
  /* background-color: pink; */
`;

export const MainPageSnowflake = styled.div`
  width: 520px;
  margin-top: 30px;
  /* width: 512px;
  height: 460px;
  margin-top: 20px;
  background-color: palegoldenrod; */
`;

export const MainPageFilterSectionWraaper = styled.div`
  display: flex;
  flex-direction: column;
  width: 608px;
  gap: 16px;
`;

export const MainPageFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background: #202833;
  padding: 20px;
`;

export const MainPageFilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainPageFilterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MainPageFilterTitle = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const MainPageFilterSubTitle = styled.div`
  color: #8b8c90;
  font-size: 12px;
`;

export const MainPageFilterReset = styled.img`
  width: 24px;
  cursor: pointer;
`;

export const MainPageFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
`;

export const MainPageSectorFilterWrapper = styled(MainPageFilterWrapper)`
  max-height: 146px;
  box-sizing: border-box;
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
`;

// 섹터설정
export const MainPageFilterFixSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  background: #202833;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
`;

export const MainPageFilterSector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainPageFilterAddIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const MainPageFilterNoSector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  color: #8b8c90;
  font-size: 12px;
`;

// 변환 결과
export const MainPageConversionWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const MainPageConversion = styled.div`
  width: fit-content;
  padding: 10px 12px;
  border-radius: 8px;
  background: #373d47;
  color: #d7d8da;
  font-size: 14px;

  span {
    font-weight: 700;
  }
`;

// 저장 모달 내용
export const SaveModal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

export const SaveModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SaveModalTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const SaveModalInput = styled.input`
  border-radius: 8px;
  border: 1px solid #3c4049;
  background: #232a35;
  width: 100%;
  padding: 18px 24px;
  flex-shrink: 0;
  box-sizing: border-box;
  color: #fff;
  font-family: "Pretendard";
`;

export const SaveModalTextArea = styled.textarea`
  border-radius: 8px;
  border: 1px solid #3c4049;
  background: #232a35;
  width: 100%;
  height: 120px;
  padding: 18px 24px;
  flex-shrink: 0;
  box-sizing: border-box;
  color: #fff;
  resize: none;
  font-family: "Pretendard";
`;

// snowflake 직접 입력
export const MainPageConversionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SnowflakeEditBtn = styled.div`
  color: #babbbd;
  font-size: 16px;
  text-decoration-line: underline;
  cursor: pointer;
`;

export const SnowflakeEditInput = styled.input`
  max-width: 60px;
  color: #babbbd;
  font-size: 16px;
  outline: none;
  background-color: #272e3b;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 0px 4px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;
