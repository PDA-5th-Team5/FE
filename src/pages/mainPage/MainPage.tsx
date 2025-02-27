import { useState } from "react";
import * as S from "./MainPage.styled";
import PlusIcon from "../../assets/images/common/icons/plus.png";
import Snowflake from "./components/snowflake/Snowflake";
import FilterGroup from "./components/filterGroup/FilterGroup";
import ResetIcon from "../../assets/images/common/icons/reset.png";
import RecommendedFilter from "./components/recommendedFilter/RecommendedFilter";
import Modal from "./components/modal/Modal";
import SectorSetting from "./components/sectorSetting/SectorSetting";
import Button from "../../components/button/Button";

// 초기 선택된 필터값
const initialSelectedKeys = [
  "시가총액",
  "PER",
  "부채비율",
  "배당수익률",
  "외국인 보유율",
];

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"popular" | "investor">("popular");

  // 섹터 모달 관리
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const openSectorModal = () => setIsSectorModalOpen(true);
  const closeSectorModal = () => setIsSectorModalOpen(false);

  // 저장 모달 관리
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const openSaveModal = () => setIsSaveModalOpen(true);
  const closeSaveModal = () => setIsSaveModalOpen(false);

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
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(initialSelectedKeys);

  // 3) 마켓 필터 항목
  const [marketFilter, setMarketFilter] = useState<string>("전체");

  // 4) 섹터 필터 항목
  const sectors = [
    "반도체",
    "금융",
    "금융",
    "금융",
    "금융금융금융금융금융금융금융금융금융금융금융금융",
    "헬스케어",
    "자동차",
    "IT",
    "에너지",
    "화학",
    "바이오",
    "통신",
    "유통",
    "부동산",
    "소비재",
    "제약",
    "건설",
    "농업",
    "공업",
    "전자",
    "서비스",
    "교육",
    "문화",
  ];

  const [selectedSectorKeys, setSelectedSectorKeys] = useState<string[]>([]);

  // 필터 항목 리셋 함수
  const handleReset = () => {
    setSelectedKeys(initialSelectedKeys);
  };

  return (
    <S.MainPageContainer>
      {/* 섹터 모달 */}
      {isSectorModalOpen && (
        <Modal
          onClose={closeSectorModal}
          title="섹터설정"
          confirmText="확인"
          onCofirm={closeSectorModal}
        >
          <SectorSetting
            allSectors={sectors}
            selectedKeys={selectedSectorKeys}
            onChange={(newSelected) => setSelectedSectorKeys(newSelected)}
          />
        </Modal>
      )}

      {/* 저장 모달 */}
      {isSaveModalOpen && (
        <Modal
          onClose={closeSaveModal}
          title="내 포트폴리오로 저장하기"
          confirmText="저장"
          onCofirm={closeSaveModal}
        >
          <S.SaveModal>
            <S.SaveModalContent>
              <S.SaveModalTitle>포트폴리오 이름</S.SaveModalTitle>
              <S.SaveModalInput placeholder="20자 이내로 작성해주세요" />
            </S.SaveModalContent>

            <S.SaveModalContent>
              <S.SaveModalTitle>포트폴리오 설명</S.SaveModalTitle>
              <S.SaveModalTextArea placeholder="50자 이내로 작성해주세요" />
            </S.SaveModalContent>
          </S.SaveModal>
        </Modal>
      )}

      <S.MainPageHeader>
        <S.MainPageTitle>Stock Snowper</S.MainPageTitle>
        <S.MainPageHeaderButtonWrapper>
          <S.MainPageHeaderReset>초기화</S.MainPageHeaderReset>
          <Button text="저장" onClick={openSaveModal} />
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

          {/* 추천 필터 리스트 */}
          <S.MainPageRecommendedFilterList>
            <RecommendedFilter />
            <RecommendedFilter />
            <RecommendedFilter />
            <RecommendedFilter />
            <RecommendedFilter />
            <RecommendedFilter />
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
              <S.MainPageFilterHeader>
                <S.MainPageFilterTitleWrapper>
                  <S.MainPageFilterTitle>필터설정</S.MainPageFilterTitle>
                  <S.MainPageFilterSubTitle>
                    * 최대 8개까지 선택 가능
                  </S.MainPageFilterSubTitle>
                </S.MainPageFilterTitleWrapper>
                <S.MainPageFilterReset src={ResetIcon} onClick={handleReset} />
              </S.MainPageFilterHeader>

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
                  options={["전체", "KOSPI", "KOSDAQ"]}
                  selected={marketFilter}
                  onChange={(newValue) => setMarketFilter(newValue)}
                />
              </S.MainPageFilterWrapper>
            </S.MainPageFilterSection>

            {/* 섹터설정 */}
            <S.MainPageFilterFixSection>
              <S.MainPageFilterSector>
                <S.MainPageFilterTitle>섹터설정</S.MainPageFilterTitle>
                <S.MainPageFilterAddIcon
                  src={PlusIcon}
                  onClick={openSectorModal}
                />
              </S.MainPageFilterSector>

              {selectedSectorKeys.length === 0 ? (
                <S.MainPageFilterNoSector>
                  선택된 섹터가 없습니다
                </S.MainPageFilterNoSector>
              ) : (
                <S.MainPageSectorFilterWrapper>
                  <FilterGroup
                    options={selectedSectorKeys}
                    selected={selectedSectorKeys}
                    multiple={true}
                    onChange={(newSelected) =>
                      setSelectedSectorKeys(newSelected)
                    }
                  />
                </S.MainPageSectorFilterWrapper>
              )}
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
