import { useState } from "react";
import * as S from "./MainPage.styled";
import ExampleImg from "../../assets/images/common/example.png";
import ImportIcon from "../../assets/images/common/icons/import.png";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"popular" | "investor">("popular");
  return (
    <S.MainPageContainer>
      <S.MainPageHeader>
        <S.MainPageTitle>Stock Snowper</S.MainPageTitle>
        <S.MainPageHeaderButtonWrapper>
          <S.MainPageHeaderReset>초기화</S.MainPageHeaderReset>
          <S.MainPageHeaderButton>저장</S.MainPageHeaderButton>
        </S.MainPageHeaderButtonWrapper>
      </S.MainPageHeader>

      <S.MainPageBox>
        <S.MainPageTabWrapper>
          <S.MainPageTab
            isActive={activeTab === "popular"}
            onClick={() => setActiveTab("popular")}
          >
            인기있는 필터
          </S.MainPageTab>
          <S.MainPageTab
            isActive={activeTab === "investor"}
            onClick={() => setActiveTab("investor")}
          >
            유명 투자자 필터
          </S.MainPageTab>
        </S.MainPageTabWrapper>

        <S.MainPageRecommendedFilterList>
          {/* ----- 더미데이터 ----- */}
          <S.MainPageRecommendedFilterWrapper>
            <S.MainPageRecommendedFilterImg src={ExampleImg} />
            <S.MainPageRecommendedFilterInfo>
              <S.MainPageRecommendedFilterTitle>
                인기있는 필터링 Top10
              </S.MainPageRecommendedFilterTitle>

              <S.MainPageRecommendedFilterCntWrapper>
                <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
                <S.MainPageRecommendedFilterCnt>
                  12,000
                </S.MainPageRecommendedFilterCnt>
              </S.MainPageRecommendedFilterCntWrapper>
            </S.MainPageRecommendedFilterInfo>
          </S.MainPageRecommendedFilterWrapper>

          <S.MainPageRecommendedFilterWrapper>
            <S.MainPageRecommendedFilterImg src={ExampleImg} />
            <S.MainPageRecommendedFilterInfo>
              <S.MainPageRecommendedFilterTitle>
                인기있는 필터링 Top10
              </S.MainPageRecommendedFilterTitle>

              <S.MainPageRecommendedFilterCntWrapper>
                <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
                <S.MainPageRecommendedFilterCnt>
                  12,000
                </S.MainPageRecommendedFilterCnt>
              </S.MainPageRecommendedFilterCntWrapper>
            </S.MainPageRecommendedFilterInfo>
          </S.MainPageRecommendedFilterWrapper>

          <S.MainPageRecommendedFilterWrapper>
            <S.MainPageRecommendedFilterImg src={ExampleImg} />
            <S.MainPageRecommendedFilterInfo>
              <S.MainPageRecommendedFilterTitle>
                인기있는 필터링 Top10
              </S.MainPageRecommendedFilterTitle>

              <S.MainPageRecommendedFilterCntWrapper>
                <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
                <S.MainPageRecommendedFilterCnt>
                  12,000
                </S.MainPageRecommendedFilterCnt>
              </S.MainPageRecommendedFilterCntWrapper>
            </S.MainPageRecommendedFilterInfo>
          </S.MainPageRecommendedFilterWrapper>

          <S.MainPageRecommendedFilterWrapper>
            <S.MainPageRecommendedFilterImg src={ExampleImg} />
            <S.MainPageRecommendedFilterInfo>
              <S.MainPageRecommendedFilterTitle>
                인기있는 필터링 Top10
              </S.MainPageRecommendedFilterTitle>

              <S.MainPageRecommendedFilterCntWrapper>
                <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
                <S.MainPageRecommendedFilterCnt>
                  12,000
                </S.MainPageRecommendedFilterCnt>
              </S.MainPageRecommendedFilterCntWrapper>
            </S.MainPageRecommendedFilterInfo>
          </S.MainPageRecommendedFilterWrapper>

          <S.MainPageRecommendedFilterWrapper>
            <S.MainPageRecommendedFilterImg src={ExampleImg} />
            <S.MainPageRecommendedFilterInfo>
              <S.MainPageRecommendedFilterTitle>
                인기있는 필터링 Top10
              </S.MainPageRecommendedFilterTitle>

              <S.MainPageRecommendedFilterCntWrapper>
                <S.MainPageRecommendedFilterCntImg src={ImportIcon} />
                <S.MainPageRecommendedFilterCnt>
                  12,000
                </S.MainPageRecommendedFilterCnt>
              </S.MainPageRecommendedFilterCntWrapper>
            </S.MainPageRecommendedFilterInfo>
          </S.MainPageRecommendedFilterWrapper>
          {/* ----- 더미데이터 ----- */}
        </S.MainPageRecommendedFilterList>
      </S.MainPageBox>
    </S.MainPageContainer>
  );
};

export default MainPage;
