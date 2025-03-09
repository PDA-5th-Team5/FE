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
  saveMyPortfolioAPI,
} from "../../apis/portfolio";
import { transformPortfolioToItems } from "../../utils/snowflakeUtils";
import {
  defaultFilterItems,
  initialSelectedKeys,
} from "./constants/defaultFilterItems";
import { labelMapping } from "../../types/snowflakeTypes";
import { useNavigate } from "react-router-dom";
import { useSectors } from "./hooks/useSectors";
import { getFilterStocksAPI } from "../../apis/stock";
import { FilterStock } from "../../types/stockTypes";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [filteredStocks, setFilteredStocks] = useState<FilterStock[]>([]);

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
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [portfolioDesc, setPortfolioDesc] = useState("");

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const openSaveModal = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다");
      navigate("/login");
    } else {
      setIsSaveModalOpen(true);
    }
  };
  const closeSaveModal = () => setIsSaveModalOpen(false);

  // 1) 필터 항목
  const [allItems, setAllItems] = useState(defaultFilterItems);

  // 2) 선택된 항목 key 목록
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(initialSelectedKeys);

  // 3) 마켓 필터 항목
  const [marketFilter, setMarketFilter] = useState<string>("전체");

  // 4) 섹터 필터 항목
  const { data: sectorsData } = useSectors();
  const sectors = sectorsData?.data ?? [];

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

  const handleSavePortfolio = async () => {
    try {
      if (!portfolioTitle.trim() || !portfolioDesc.trim()) {
        alert("포트폴리오 제목과 설명은 필수 입력 사항입니다.");
        return;
      }

      const reverseMapping = Object.entries(labelMapping).reduce(
        (acc, [eng, kor]) => {
          acc[kor] = eng;
          return acc;
        },
        {} as Record<string, string>
      );

      // 선택된 항목들의 range 정보를 객체로 생성
      const selectedMetrics = selectedKeys.reduce(
        (acc, key) => {
          const found = allItems.find((item) => item.key === key);
          if (found) {
            const englishKey = reverseMapping[key] || key;
            acc[englishKey] = { min: found.D2Value, max: found.D1Value };
          }
          return acc;
        },
        {} as Record<string, { min: number; max: number }>
      );

      const payload = {
        category: "my",
        title: portfolioTitle,
        description: portfolioDesc,
        market: marketFilter,
        ...selectedMetrics,
        sector: selectedSectorKeys,
      };

      const response = await saveMyPortfolioAPI(payload);
      alert("저장 성공");
      // TODO : 나의 포트폴리오 페이지로 연결
      closeSaveModal();
    } catch (error) {
      alert("저장 실패");
    }
  };

  useEffect(() => {
    handleFilterStocks();
  }, [selectedKeys, marketFilter, selectedSectorKeys]);

  // [API] 조건 검색 결과 조회
  const handleFilterStocks = async () => {
    try {
      const reverseMapping = Object.entries(labelMapping).reduce(
        (acc, [eng, kor]) => {
          acc[kor] = eng;
          return acc;
        },
        {} as Record<string, string>
      );

      // 선택된 필터 항목의 range 정보를 가져와 filters 객체 구성
      const filters = selectedKeys.reduce(
        (acc, key) => {
          const found = allItems.find((item) => item.key === key);
          if (found) {
            // reverseMapping을 사용하여 영어 키로 변환
            const englishKey = reverseMapping[key] || key;
            acc[englishKey] = { min: found.D2Value, max: found.D1Value };
          }
          return acc;
        },
        {} as Record<string, { min: number; max: number }>
      );

      const marketType: "ALL" | "KOSPI" | "KOSDAQ" =
        marketFilter === "전체" ? "ALL" : (marketFilter as "KOSPI" | "KOSDAQ");

      // payload 구성
      const payload = {
        marketType,
        ...(selectedSectorKeys.length > 0 && { sector: selectedSectorKeys }),
        filters,
      };

      const response = await getFilterStocksAPI(payload);
      setFilteredStocks(response.data);
    } catch (error) {
      console.error("필터 API 호출 실패:", error);
    }
  };

  // 드래그 종료 시점에만 호출할 함수
  const handleSnowflakeDragEnd = () => {
    handleFilterStocks();
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
          onCofirm={handleSavePortfolio}
        >
          <S.SaveModal>
            <S.SaveModalContent>
              <S.SaveModalTitle>포트폴리오 이름</S.SaveModalTitle>
              <S.SaveModalInput
                placeholder="20자 이내로 작성해주세요"
                value={portfolioTitle}
                onChange={(e) => setPortfolioTitle(e.target.value)}
              />
            </S.SaveModalContent>

            <S.SaveModalContent>
              <S.SaveModalTitle>포트폴리오 설명</S.SaveModalTitle>
              <S.SaveModalTextArea
                placeholder="50자 이내로 작성해주세요"
                value={portfolioDesc}
                onChange={(e) => setPortfolioDesc(e.target.value)}
              />
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
                onSnowflakeDragEnd={handleSnowflakeDragEnd}
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

      <StockResult data={filteredStocks} />
    </S.MainPageContainer>
  );
};

export default MainPage;
