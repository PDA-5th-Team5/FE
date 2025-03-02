import * as S from "./PortfolioPage.styled";

const PortfolioPage = () => {
  return (
    <S.PortfolioPageContainer>
      <S.PortfolioDescription>
        제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에
        대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다
        제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에
        대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다
        제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에
        대한 설명을 적을겁니다 제가 쓴 포트폴리오 123에 대한 설명을 적을겁니다
      </S.PortfolioDescription>

      <S.PortfolioContent>
        <S.PortfolioContentLeft>
          <S.PortfolioSummary>
            <S.PortfolioContentTitle>포트폴리오 요약</S.PortfolioContentTitle>
            <S.PortfolioSummaryItemWrapper>
              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine $isFirst={true} />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    50조
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 시가총액
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    23.08
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 PER
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    25.01%
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 부채비율
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>

              {/* 이렇게가 하나입니다! */}
              <S.PortfolioSummaryItem>
                <S.PortfolioSummaryItemLine />
                <S.PortfolioSummaryItemData>
                  <S.PortfolioSummaryItemDataValue>
                    2.08
                  </S.PortfolioSummaryItemDataValue>
                  <S.PortfolioSummaryItemDataTitle>
                    평균 배당
                  </S.PortfolioSummaryItemDataTitle>
                </S.PortfolioSummaryItemData>
              </S.PortfolioSummaryItem>
            </S.PortfolioSummaryItemWrapper>
          </S.PortfolioSummary>
          <S.PortfolioLineGraph></S.PortfolioLineGraph>
        </S.PortfolioContentLeft>

        <S.PortfolioContentRight>
          <S.PortfolioContentTitle>
            포트폴리오 Snowflake
          </S.PortfolioContentTitle>
        </S.PortfolioContentRight>
      </S.PortfolioContent>
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
