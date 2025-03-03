import * as S from "./PortfolioPage.styled";
import Example from "../../assets/images/exampleCard.png";
import StockResult from "../../components/stock/result/StockResult";
import Snowflake from "../../components/snowflake/Snowflake";
import { useState } from "react";
import { Item, labelMapping } from "../../types/snowflakeTypes";
import { transformElementsToItems } from "../../utils/snowflakeUtils";

// 더미 데이터
const dummyResponse = {
  status: 200,
  message: "성공입니다.",
  data: {
    snowflake: {
      elements: {
        bsopPrti: [5, 19], // 영업이익
        thtrNtin: [1, 3], // 당기순이익
        roeVal: [10, 16], // ROE (자기자본이익률)
        cptlNtinRate: [2, 7], // 총자본 순이익률
        eps: [3, 6], // EPS
        per: [12, 18], // PER
      },
      market: "코스피",
      sectors: ["반도체", "바이오"],
    },
  },
};

const PortfolioPage = () => {
  // dummy 데이터의 elements를 이용하여 아이템 생성
  const dummyItems = transformElementsToItems(
    dummyResponse.data.snowflake.elements
  );
  const [allItems, setAllItems] = useState<Item[]>(dummyItems);
  // 여기서는 모든 키를 선택한 상태로 가정
  const selectedKeys = dummyItems.map((item) => item.key);

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
          <S.PortfolioLineGraph>
            <S.PortfolioContentTitle>
              포트폴리오 vs 시장 그래프 비교
            </S.PortfolioContentTitle>
          </S.PortfolioLineGraph>
        </S.PortfolioContentLeft>

        <S.PortfolioContentRight>
          <S.PortfolioContentTitle>
            포트폴리오 Snowflake
          </S.PortfolioContentTitle>
          <S.PortfolioContentSnowflake>
            <S.PortfolioContentSnowflakeWrapper>
              <Snowflake
                allItems={allItems}
                selectedKeys={selectedKeys}
                showLabels={true}
              />
            </S.PortfolioContentSnowflakeWrapper>
          </S.PortfolioContentSnowflake>
          <S.PortfolioContentMarketWrapper>
            <S.PortfolioContentMarket>KOSPI</S.PortfolioContentMarket>
          </S.PortfolioContentMarketWrapper>
        </S.PortfolioContentRight>
      </S.PortfolioContent>

      <S.PortfolioStock>
        <StockResult />
      </S.PortfolioStock>
    </S.PortfolioPageContainer>
  );
};

export default PortfolioPage;
