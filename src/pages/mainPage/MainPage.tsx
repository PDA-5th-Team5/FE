import { useEffect, useState } from "react";
import * as S from "./MainPage.styled";
import PlusIcon from "../../assets/images/icons/plus.png";
import Snowflake from "./components/snowflake/Snowflake";
import FilterGroup from "./components/filterGroup/FilterGroup";
import ResetIcon from "../../assets/images/icons/reset.png";
import RecommendedFilter from "./components/recommendedFilter/RecommendedFilter";
import Modal from "./components/modal/Modal";
import SectorSetting from "./components/sectorSetting/SectorSetting";
import PageHeader from "../../components/pageHeader/PageHeader";
import Tabs, { TabItem } from "../../components/tab/Tabs";
import StockResult from "../../components/stock/result/StockResult";
import {
  RecommededPortfolio,
  recommededPortfolioAPI,
} from "../../apis/portfolio";
import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
import {
  defaultFilterItems,
  initialSelectedKeys,
} from "./constants/defaultFilterItems";

//더미데이터
const dummyStockResponse = {
  status: 201,
  message: "성공입니다.",
  data: {
    stockCnt: 4,
    stockInfos: [
      {
        snowflakeS: {
          elements: {
            bsopPrti: 19,
            thtrNtin: 19,
            roeVal: 16,
            cptlNtinRate: 7,
            eps: 6,
            per: 18,
          },
        },
        stockId: 1,
        ticker: "05252",
        companyName: "삼성전자",
        currentPrice: 50000,
        "1DayFluctuationRate": 0.2,
        "1WeekFluctuationRate": 7.3,
        "1YearFluctuationRate": 13.1,
        marketCap: 4500,
        per: 13.56,
        debtRate: 30.49,
        sector: "반도체",
        isBookmark: false,
        description:
          "삼성전자는 세계적인 전자제품 제조업체로, 다양한 소비자 가전 및 반도체 제품을 생산합니다.",
      },
      {
        snowflakeS: {
          elements: {
            bsopPrti: 19,
            thtrNtin: 3, // 당기순이익
            roeVal: 16, // ROE
          },
        },
        stockId: 2,
        ticker: "013660",
        companyName: "하이닉스",
        currentPrice: 50000,
        "1DayFluctuationRate": 0.4,
        "1WeekFluctuationRate": 5.1,
        "1YearFluctuationRate": 10.0,
        marketCap: 9000,
        per: 17.56,
        debtRate: 33.49,
        sector: "반도체",
        isBookmark: false, // 추가
        description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.", // 추가
      },
      {
        snowflakeS: {
          elements: {
            thtrNtin: 3, // 당기순이익
            roeVal: 10, // ROE
          },
        },
        stockId: 3,
        ticker: "013660",
        companyName: "하이닉스",
        currentPrice: 50000,
        "1DayFluctuationRate": 0.4,
        "1WeekFluctuationRate": 5.1,
        "1YearFluctuationRate": 10.0,
        marketCap: 9000,
        per: 17.56,
        debtRate: 33.49,
        sector: "반도체",
        isBookmark: false, // 추가
        description: "하이닉스는 메모리 반도체 분야의 선도 기업입니다.", // 추가
      },
      // ...추가 주식 데이터
    ],
  },
};

const MainPage: React.FC = () => {
  // 추천 필터
  const [activeTab, setActiveTab] = useState("popular");
  const tabItems: TabItem[] = [
    { label: "인기있는 필터", value: "popular" },
    { label: "유명 투자자 추천필터", value: "expert" },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // 섹터 모달 관리
  const [isSectorModalOpen, setIsSectorModalOpen] = useState(false);
  const openSectorModal = () => setIsSectorModalOpen(true);
  const closeSectorModal = () => setIsSectorModalOpen(false);

  // 저장 모달 관리
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const openSaveModal = () => setIsSaveModalOpen(true);
  const closeSaveModal = () => setIsSaveModalOpen(false);

  // 1) 필터 항목
  const [allItems, setAllItems] = useState(defaultFilterItems);

  // 2) 선택된 항목 key 목록
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(initialSelectedKeys);

  // 3) 마켓 필터 항목
  const [marketFilter, setMarketFilter] = useState<string>("전체");

  // 4) 섹터 필터 항목
  const sectors = [
    "반도체",
    "금융",
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
  const [recommendedPortfolios, setRecommendedPortfolios] = useState<
    RecommededPortfolio[]
  >([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // 필터 항목 리셋 함수
  const handleReset = () => {
    setAllItems(defaultFilterItems);
    setSelectedKeys(initialSelectedKeys);
  };

  const handleAllReset = () => {
    handleReset();
    setMarketFilter("전체");
    setSelectedSectorKeys([]);
  };

  // [API] 인기 포트폴리오 조회 & 전문가 포트폴리오 조회
  const fetchRecommendedData = (activeTab: string) => {
    recommededPortfolioAPI(activeTab)
      .then((data) => {
        setRecommendedPortfolios(data);
      })
      .catch((err) => {
        console.error("API 호출 실패:", err);
      });
  };

  useEffect(() => {
    fetchRecommendedData(activeTab);
  }, [activeTab]);

  const handleSelectRecommended = (portfolio: RecommededPortfolio) => {
    const items = transformPortfolioToItems(portfolio.portfolio);
    setSelectedKeys(items.map((item) => item.label));

    const merged = defaultFilterItems.map((def) => {
      const found = items.find((it) => it.key === def.key);
      if (found) {
        return { ...def, D1Value: found.D1Value, D2Value: found.D2Value };
      }
      return def;
    });

    setAllItems(merged);
    setSelectedKeys(items.map((item) => item.key));

    if (portfolio.portfolio.market) {
      setMarketFilter(portfolio.portfolio.market);
    }

    if (portfolio.portfolio.sector) {
      setSelectedSectorKeys(portfolio.portfolio.sector);
    }
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

      <PageHeader
        title="Stock Snowper"
        headerButtons={{
          leftText: "초기화",
          onLeftClick: handleAllReset,
          rightText: "저장",
          onRightClick: openSaveModal,
        }}
      />

      {/* 추천필터 */}
      <S.MainPageBox>
        <S.MainPageTabContainer>
          <Tabs
            items={tabItems}
            activeValue={activeTab}
            onChange={handleTabChange}
          />

          {/* 추천 필터 리스트 */}
          <S.MainPageRecommendedFilterList>
            {recommendedPortfolios.map((item) => {
              return (
                <RecommendedFilter
                  key={item.sharePortfolioId}
                  data={item}
                  onSelectRecommended={handleSelectRecommended}
                />
              );
            })}
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
                  options={defaultFilterItems.map((item) => item.key)}
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

      <StockResult data={dummyStockResponse.data} />
    </S.MainPageContainer>
  );
};

export default MainPage;
