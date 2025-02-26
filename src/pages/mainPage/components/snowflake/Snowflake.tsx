import "chartjs-plugin-dragdata";
import "chart.js/auto";

import { useMemo, useState } from "react";
import { Radar } from "react-chartjs-2";
import { DrawGridOnTop } from "./DrawGridOnTop";
import styled from "styled-components";

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0px;
  gap: 24px;
`;

const Snowflake: React.FC = () => {
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
      key: "총자본순이익률",
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
    "총자본순이익률",
    "시가총액",
    "배당수익률",
    "PER",
    "매출액",
  ]);

  // 3) 필터링된 항목들
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => selectedKeys.includes(item.key));
  }, [allItems, selectedKeys]);

  // 4) 차트에 들어갈 data 객체를 useMemo로 캐싱
  const chartData = useMemo(() => {
    return {
      labels: filteredItems.map((item) => item.label),
      datasets: [
        {
          data: filteredItems.map((item) => item.D2Value),
          label: "D2",
          borderColor: "#FEFE08",
          borderWidth: 4,
          pointBackgroundColor: "#FBFF439C",
          backgroundColor: "#414b58",
          tension: 0.4,
          pointSize: 8,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          data: filteredItems.map((item) => item.D1Value),
          label: "D1",
          borderColor: "#FEFE08",
          borderWidth: 4,
          backgroundColor: "#FBFF439C",
          pointBackgroundColor: "#FBFF439C",
          tension: 0.4,
          pointSize: 8,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [filteredItems]);

  // D1과 D2의 드래그 로직
  // datasetIndex === 1 => D1, datasetIndex === 0 => D2

  // 5) 드래그 핸들러
  const handleDrag = (
    datasetIndex: number,
    index: number,
    newValue: number | null
  ) => {
    if (newValue === null) return;

    // 1단위로 할거기 때문에 반올림
    const roundedValue = Math.round(newValue);

    // filteredItems[index] -> 해당 항목
    const targetKey = filteredItems[index].key;

    setAllItems((prev) => {
      return prev.map((item) => {
        if (item.key !== targetKey) return item; // 대상 아님

        if (datasetIndex === 1) {
          // D1
          return {
            ...item,
            D1Value: Math.max(roundedValue, item.D2Value + 1),
          };
        } else {
          // D2
          const candidate = Math.min(roundedValue, item.D1Value) - 1;
          return {
            ...item,
            D2Value: Math.max(candidate, 0),
          };
        }
      });
    });
  };

  // 차트 옵션
  const options = useMemo(() => {
    return {
      scales: {
        r: {
          backgroundColor: "#414b5833",
          min: 0,
          max: 20,
          grid: {
            circular: true, // 격자를 원형으로
            // color: '#414b58', // 거미줄 중간 중간 선 색상
            // borderRadius: 12
          },
          ticks: {
            display: false, // 숫자 라벨(0,2,4,6...) 숨기기
            color: "#414b58", // 숫자 라벨(6, 8, 10, 12...)의 색
            stepSize: 2,
            // showLabelBackdrop: false,
          },
          pointLabels: {
            font: {
              size: 14,
              family: "Pretendard",
            },
            padding: 12,
            color: "#ffffff", // 각 포인트 라벨(Point 1, Point 2...)의 색을 흰색으로 설정
            callback: function (value: string) {
              return value.replace(" ", "\n"); // 첫 번째 공백을 기준으로 줄 바꿈
            },
          },
          angleLines: {
            // display: false, // 중심에서 바깥으로 뻗는 각도선 제거
            // color: "#ddd", // 보이게 할 경우 색상 지정
          },
        },
      },

      plugins: {
        dragData: {
          onDrag: (
            event: any,
            datasetIndex: number,
            index: number,
            value: number | null
          ) => {
            handleDrag(datasetIndex, index, value);
          },
          onDragEnd: (
            event: any,
            datasetIndex: number,
            index: number,
            value: number | null
          ) => {
            console.log("drag end", { event, datasetIndex, index, value });
          },
          onDragStart: (
            event: any,
            datasetIndex: number,
            index: number,
            value: number | null
          ) => {
            console.log("drag start", { event, datasetIndex, index, value });
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false, // 툴팁 숨기기
        },
      },
    };
  }, [filteredItems]);

  // 7) 필터 UI
  // const toggleFilter = (key: string) => {
  //   setSelectedKeys((prev) =>
  //     prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
  //   );
  // };

  return <Radar data={chartData} options={options} plugins={[DrawGridOnTop]} />;
};

export default Snowflake;
