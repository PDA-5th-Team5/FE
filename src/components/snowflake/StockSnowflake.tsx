import "chart.js/auto";
import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import { DrawGridOnTop } from "../../pages/mainPage/components/snowflake/DrawGridOnTop";
import { Item } from "../../types/snowflakeTypes";

interface SnowflakeProps {
  allItems: Item[];
  selectedKeys: string[];
  showLabels?: boolean;
  fontSize?: number;
}

const hsvToRgb = (h: number, s: number, v: number) => {
  let r = 0,
    g = 0,
    b = 0; // 초기값 설정

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
    default:
      r = 1;
      g = 1;
      b = 1;
  }

  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, 0.7)`;
};

const getColorBasedOnValue = (value: number) => {
  const minVal = 0,
    maxVal = 20;
  const hue = ((value - minVal) / (maxVal - minVal)) * 0.85; // 0~0.85 범위의 색상 (빨강~보라)
  return hsvToRgb(hue, 1, 1);
};

const StockSnowflake: React.FC<SnowflakeProps> = ({
  allItems,
  selectedKeys,
  showLabels,
  fontSize = 8,
}) => {
  // 선택된 항목들만 필터링
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => selectedKeys.includes(item.key));
  }, [allItems, selectedKeys]);

  // 차트 데이터 객체 생성
  const chartData = useMemo(() => {
    return {
      labels: filteredItems.map((item) => item.label),
      datasets: [
        {
          data: filteredItems.map((item) => item.D1Value),
          borderColor: filteredItems.map((item) =>
            getColorBasedOnValue(item.D1Value)
          ),
          borderWidth: showLabels ? 4 : 2,
          backgroundColor: filteredItems.map((item) =>
            getColorBasedOnValue(item.D1Value).replace("0.7", "0.3")
          ),
          tension: 0.4,
          pointSize: 8,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    };
  }, [filteredItems]);

  const options = useMemo(() => {
    return {
      scales: {
        r: {
          backgroundColor: "#414b5833",
          min: 0,
          max: 20,
          grid: {
            circular: true, // 격자를 원형으로
          },
          ticks: {
            display: false, // 숫자 라벨 숨김
            color: "#414b58",
            stepSize: 2,
          },
          pointLabels: {
            font: {
              size: fontSize,
              family: "Pretendard",
            },
            display: showLabels ? true : false,
            padding: 12,
            color: showLabels ? "#ffffff" : "transparent",
          },
        },
      },
      plugins: {
        dragData: false,
        legend: { display: false },
        tooltip: { enabled: false },
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  }, [filteredItems]);

  return <Radar data={chartData} options={options} plugins={[DrawGridOnTop]} />;
};

export default StockSnowflake;
