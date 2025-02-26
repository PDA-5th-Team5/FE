import { useState } from "react";
import * as S from "./MainPage.styled";
import ExampleImg from "../../assets/images/common/example.png";
import ImportIcon from "../../assets/images/common/icons/import.png";
import PlusIcon from "../../assets/images/common/icons/plus.png";
import Snowflake from "./components/snowflake/Snowflake";

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

      {/* 추천필터 */}
      <S.MainPageBox>
        <S.MainPageTabContainer>
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
            {/* ----- 더미데이터 ----- */}
          </S.MainPageRecommendedFilterList>
        </S.MainPageTabContainer>
      </S.MainPageBox>

      {/* 필터 설정 */}
      <S.MainPageBox>
        <S.MainPageFilterContainer>
          {/* snowflake */}
          <S.MainPageSnowflakeWrapper>
            <S.MainPageFilterTitle>Snowflake</S.MainPageFilterTitle>
            <S.MainPageSnowflake>
              <Snowflake />
            </S.MainPageSnowflake>
          </S.MainPageSnowflakeWrapper>
          <S.MainPageFilterSectionWraaper>
            {/* 필터설정 */}
            <S.MainPageFilterSection>
              <S.MainPageFilterTitleWrapper>
                <S.MainPageFilterTitle>필터설정</S.MainPageFilterTitle>
                <S.MainPageFilterSubTitle>
                  * 최대 8개까지 선택 가능
                </S.MainPageFilterSubTitle>
              </S.MainPageFilterTitleWrapper>

              <S.MainPageFilterWrapper>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
                <S.MainPageFilterItem>시가총액</S.MainPageFilterItem>
              </S.MainPageFilterWrapper>
            </S.MainPageFilterSection>
            {/* 마켓설정 */}
            <S.MainPageFilterSection>
              <S.MainPageFilterTitle>마켓설정</S.MainPageFilterTitle>

              <S.MainPageFilterWrapper>
                <S.MainPageFilterItem>전체</S.MainPageFilterItem>
                <S.MainPageFilterItem>코스닥</S.MainPageFilterItem>
                <S.MainPageFilterItem>코스피</S.MainPageFilterItem>
              </S.MainPageFilterWrapper>
            </S.MainPageFilterSection>

            {/* 섹터설정 */}
            <S.MainPageFilterFixSection>
              <S.MainPageFilterSector>
                <S.MainPageFilterTitle>섹터설정</S.MainPageFilterTitle>
                <S.MainPageFilterAddIcon src={PlusIcon} />
              </S.MainPageFilterSector>
              <S.MainPageFilterNoSector>
                선택된 섹터가 없습니다
              </S.MainPageFilterNoSector>
            </S.MainPageFilterFixSection>
          </S.MainPageFilterSectionWraaper>
        </S.MainPageFilterContainer>
      </S.MainPageBox>

      <S.MainPageConversionWrapper>
        <S.MainPageConversion>시가총액 500억 ~ 1000억</S.MainPageConversion>
        <S.MainPageConversion>PER 5 ~ 11</S.MainPageConversion>
        <S.MainPageConversion>또 뭐있냐</S.MainPageConversion>
      </S.MainPageConversionWrapper>
    </S.MainPageContainer>
  );
};

export default MainPage;
