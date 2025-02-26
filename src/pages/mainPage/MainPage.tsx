import { useMemo, useState } from "react";
import * as S from "./MainPage.styled";
import ExampleImg from "../../assets/images/common/example.png";
import ImportIcon from "../../assets/images/common/icons/import.png";
import PlusIcon from "../../assets/images/common/icons/plus.png";
import Snowflake from "./components/snowflake/Snowflake";
import FilterGroup from "./components/filterGroup/FilterGroup";

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"popular" | "investor">("popular");

  // 1) 필터 항목
  const [allItems, setAllItems] = useState([
    { key: "시가총액", label: "시가총액 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "매출액", label: "매출액 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "영업이익", label: "영업이익 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "당기순이익", label: "당기순이익 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "ROE", label: "ROE ⓘ", D1Value: 19, D2Value: 5 },
    { key: "EPS", label: "EPS ⓘ", D1Value: 19, D2Value: 5 },
    { key: "PER", label: "PER ⓘ", D1Value: 19, D2Value: 5 },
    { key: "BPS", label: "BPS ⓘ", D1Value: 19, D2Value: 5 },
    { key: "매출액 증가율", label: "매출액 증가율 ⓘ", D1Value: 19, D2Value: 5 },
    {
      key: "영업이익 증가율",
      label: "영업이익 증가율 ⓘ",
      D1Value: 19,
      D2Value: 5,
    },
    { key: "순이익 증가율", label: "순이익 증가율 ⓘ", D1Value: 19, D2Value: 5 },
    {
      key: "총자본 순이익률",
      label: "총자본 순이익률 ⓘ",
      D1Value: 19,
      D2Value: 5,
    },
    { key: "유동비율", label: "유동비율 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "부채비율", label: "부채비율 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "주당매출액", label: "주당매출액 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "배당수익률", label: "배당수익률 ⓘ", D1Value: 19, D2Value: 5 },
    { key: "외국인 보유율", label: "외국인 보유율 ⓘ", D1Value: 19, D2Value: 5 },
  ]);

  // 2) 선택된 항목 key 목록
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    "시가총액",
    "PER",
    "부채비율",
    "배당수익률",
    "외국인 보유율",
  ]);

  // 3) 마켓 필터 항목
  const [marketFilter, setMarketFilter] = useState<string>("전체");

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
              $isActive={activeTab === "popular"}
              onClick={() => setActiveTab("popular")}
            >
              인기있는 필터
            </S.MainPageTab>
            <S.MainPageTab
              $isActive={activeTab === "investor"}
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
              <Snowflake
                allItems={allItems}
                setAllItems={setAllItems}
                selectedKeys={selectedKeys}
              />
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
                <FilterGroup
                  options={allItems.map((item) => item.key)}
                  selected={selectedKeys}
                  multiple={true}
                  onChange={(newSelected) => setSelectedKeys(newSelected)}
                  maxSelection={8}
                />
              </S.MainPageFilterWrapper>
            </S.MainPageFilterSection>

            {/* 마켓설정 */}
            <S.MainPageFilterSection>
              <S.MainPageFilterTitle>마켓설정</S.MainPageFilterTitle>

              <S.MainPageFilterWrapper>
                <FilterGroup
                  options={["전체", "코스닥", "코스피"]}
                  selected={marketFilter}
                  onChange={(newValue) => setMarketFilter(newValue)}
                />
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
