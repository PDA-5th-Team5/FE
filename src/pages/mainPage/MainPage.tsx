import { useEffect, useMemo, useState } from "react";
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
import { useInView } from "react-intersection-observer";
import { useThresholds } from "./hooks/useThresholds";
import Button from "../../components/button/Button";
import Tooltip from "../../components/tooltip/tooltip";

type ThresholdRange = {
  label: string;
  minText: string;
  maxText: string;
};

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  // 직접 편집 기능
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editStates, setEditStates] = useState<
    Record<string, { tempMin: string; tempMax: string }>
  >({});

  // 무한 스크롤을 위한
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const [isLast, setIsLast] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState<FilterStock[]>([]);
  const [filteredStocksCnt, setFilteredStocksCnt] = useState(0);

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

  // 5) 임계값
  const { data: thresholdsData } = useThresholds();
  const thresholds = (thresholdsData?.data ?? {}) as Record<string, number[]>;

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
        market: marketFilter === "전체" ? "ALL" : marketFilter,
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

  // [API] 조건 검색 결과 조회
  const handleFilterStocks = async (page: number) => {
    try {
      if (page === 0) {
        setIsLoading(true);
      }

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

      const response = await getFilterStocksAPI({ payload, page });

      if (page === 0) {
        setFilteredStocks(response.data.stocks);
        setFilteredStocksCnt(response.data.totalCount);
      } else {
        setFilteredStocks((prevData) => [...prevData, ...response.data.stocks]);
      }

      if (response.data.stocks.length === 0) {
        setIsLast(true);
      }
    } catch (error) {
      console.error("필터 API 호출 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 드래그 종료 시점에만 호출할 함수
  const handleSnowflakeDragEnd = () => {
    handleFilterStocks(0);
  };

  useEffect(() => {
    setFilteredStocks([]);
    setPage(0);
    setIsLast(false);
    handleFilterStocks(0);
  }, [selectedKeys, marketFilter, selectedSectorKeys]);

  useEffect(() => {
    if (inView && !isLoading && !isLast) {
      setTimeout(() => {
        handleFilterStocks(page + 1);
        setPage((prev) => prev + 1);
      }, 10);
    }
  }, [inView]);

  // 3) 현재 선택된 지표만 필터링
  const filteredItems = useMemo(
    () => allItems.filter((item) => selectedKeys.includes(item.key)),
    [allItems, selectedKeys]
  );

  const reverseMapping = Object.entries(labelMapping).reduce(
    (acc, [eng, kor]) => {
      acc[kor] = eng;
      return acc;
    },
    {} as Record<string, string>
  );

  // 4) 임계값(배열)과 D1/D2 인덱스를 매핑해서 범위 텍스트로 변환
  const [thresholdRanges, setThresholdRanges] = useState<ThresholdRange[]>([]);
  useEffect(() => {
    const newRanges = filteredItems.map((item) => {
      const engKey = reverseMapping[item.key] || item.key;
      const thresholdArr = thresholds[engKey];
      const maxIndex = item.D1Value;
      const minIndex = item.D2Value;
      let minText = "";
      let maxText = "";

      if (thresholdArr) {
        if (minIndex === 0) {
          minText = "-∞";
        } else if (minIndex > 0 && minIndex < thresholdArr.length) {
          minText = thresholdArr[minIndex - 1].toString();
        }
        if (maxIndex >= 1 && maxIndex <= thresholdArr.length) {
          maxText = thresholdArr[maxIndex - 1].toString();
        }
      }
      return { label: item.key, minText, maxText };
    });

    // API 무한 요청 막기
    setThresholdRanges((prevRanges) => {
      if (JSON.stringify(prevRanges) === JSON.stringify(newRanges)) {
        return prevRanges;
      }
      return newRanges;
    });
  }, [filteredItems, thresholds]);

  // 사용자 입력값에 대해서 가장 가까운 min값 계산
  function findClosestMin(thresholdArr: number[], userValue: number) {
    const filtered = thresholdArr.filter((v) => v <= userValue);
    if (filtered.length === 0) return "-∞";
    return Math.max(...filtered);
  }

  // 사용자 입력값에 대해서 가장 가까운 max값 계산
  function findClosestMax(thresholdArr: number[], userValue: number) {
    const maxThreshold = Math.max(...thresholdArr);
    if (userValue >= maxThreshold) {
      return maxThreshold;
    }
    const filtered = thresholdArr.filter((v) => v >= userValue);
    if (filtered.length === 0) return maxThreshold;
    return Math.min(...filtered);
  }

  const handleConfirmAll = () => {
    // 1. 최소값과 최대값 검증
    for (const label in editStates) {
      const { tempMin, tempMax } = editStates[label];
      if (tempMin.trim() !== "" && tempMax.trim() !== "") {
        const numericMin = parseFloat(tempMin);
        const numericMax = parseFloat(tempMax);
        if (numericMin >= numericMax) {
          alert(`${label} 항목 : 최소값은 최대값보다 작아야 합니다.`);
          return;
        }
      }
    }

    // 2. thresholdRanges 업데이트 (화면에 표시되는 텍스트 업데이트)
    Object.keys(editStates).forEach((label) => {
      const { tempMin, tempMax } = editStates[label];
      const engKey = reverseMapping[label] || label;
      const thresholdArr = thresholds[engKey];
      if (!thresholdArr) return;

      const current = thresholdRanges.find((item) => item.label === label);

      let newMinText, newMaxText;
      if (tempMin.trim() === "") {
        newMinText = current ? current.minText : "-∞";
      } else {
        const numericMin = parseFloat(tempMin);
        newMinText = findClosestMin(thresholdArr, numericMin);
      }

      if (tempMax.trim() === "") {
        newMaxText = current
          ? current.maxText
          : Math.max(...thresholdArr).toString();
      } else {
        const numericMax = parseFloat(tempMax);
        newMaxText = findClosestMax(thresholdArr, numericMax);
      }

      setThresholdRanges((prev) =>
        prev.map((item) =>
          item.label === label
            ? {
                ...item,
                minText: newMinText.toString(),
                maxText: newMaxText.toString(),
              }
            : item
        )
      );
    });

    // 3. allItems 업데이트하여 Snowflake 그래프에 반영
    setAllItems((prevItems) =>
      prevItems.map((item) => {
        const label = item.key;
        const editState = editStates[label];
        if (editState) {
          const engKey = reverseMapping[label] || label;
          const thresholdArr = thresholds[engKey];
          if (!thresholdArr) return item;

          let newD2Value = item.D2Value; // 기본값 유지
          let newD1Value = item.D1Value; // 기본값 유지

          // 최소값 업데이트
          if (editState.tempMin.trim() !== "") {
            const numericMin = parseFloat(editState.tempMin);
            const closestMinValue = findClosestMin(thresholdArr, numericMin);
            // "-∞" 인 경우는 0으로 처리
            if (closestMinValue === "-∞") {
              newD2Value = 0;
            } else {
              const index = thresholdArr.indexOf(closestMinValue);
              if (index !== -1) newD2Value = index + 1;
            }
          }
          // 최대값 업데이트
          if (editState.tempMax.trim() !== "") {
            const numericMax = parseFloat(editState.tempMax);
            const closestMaxValue = findClosestMax(thresholdArr, numericMax);
            const index = thresholdArr.lastIndexOf(closestMaxValue);
            if (index !== -1) newD1Value = index + 1;
          }
          return { ...item, D2Value: newD2Value, D1Value: newD1Value };
        }
        return item;
      })
    );

    setIsEditingAll(false);
    setEditStates({});

    // API 재요청
    setFilteredStocks([]);
    setPage(0);
    setIsLast(false);
    handleFilterStocks(0);
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
                maxLength={20}
                onChange={(e) => setPortfolioTitle(e.target.value)}
              />
            </S.SaveModalContent>

            <S.SaveModalContent>
              <S.SaveModalTitle>포트폴리오 설명</S.SaveModalTitle>
              <S.SaveModalTextArea
                placeholder="500자 이내로 작성해주세요"
                value={portfolioDesc}
                maxLength={500}
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

      <S.MainPageConversionContainer>
        {!isEditingAll ? (
          <S.SnowflakeEditBtn
            onClick={() => {
              const initialStates = thresholdRanges.reduce(
                (acc, item) => {
                  acc[item.label] = {
                    tempMin: item.minText,
                    tempMax: item.maxText,
                  };
                  return acc;
                },
                {} as Record<string, { tempMin: string; tempMax: string }>
              );
              setEditStates(initialStates);
              setIsEditingAll(true);
            }}
          >
            직접입력
          </S.SnowflakeEditBtn>
        ) : (
          <S.ButtonWrapper>
            <Button text="확인" onClick={handleConfirmAll} />
          </S.ButtonWrapper>
        )}
        <S.MainPageConversionWrapper>
          {thresholdRanges.map(({ label, minText, maxText }) => (
            <S.MainPageConversion key={label}>
              <span>{label} </span>
              {isEditingAll ? (
                <>
                  <S.SnowflakeEditInput
                    type="number"
                    value={editStates[label]?.tempMin || ""}
                    onChange={(e) =>
                      setEditStates((prev) => ({
                        ...prev,
                        [label]: {
                          tempMin: e.target.value,
                          tempMax: prev[label]?.tempMax || "",
                        },
                      }))
                    }
                  />

                  {"~"}

                  <S.SnowflakeEditInput
                    type="number"
                    value={editStates[label]?.tempMax || ""}
                    onChange={(e) =>
                      setEditStates((prev) => ({
                        ...prev,
                        [label]: {
                          tempMin: prev[label]?.tempMin || "",
                          tempMax: e.target.value,
                        },
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  {minText} ~ {maxText}
                </>
              )}
            </S.MainPageConversion>
          ))}
        </S.MainPageConversionWrapper>
      </S.MainPageConversionContainer>
      <StockResult
        data={filteredStocks}
        filteredStocksCnt={filteredStocksCnt}
        loading={isLoading}
      />
      <div ref={ref}></div>
    </S.MainPageContainer>
  );
};

export default MainPage;
