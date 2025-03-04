import "chart.js/auto";
import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import { DrawGridOnTop } from "../../pages/mainPage/components/snowflake/DrawGridOnTop";
import { Item } from "../../types/snowflakeTypes";

interface SnowflakeProps {
  allItems: Item[];
  selectedKeys: string[];
  showLabels?: boolean;
}

const StockSnowflake: React.FC<SnowflakeProps> = ({
  allItems,
  selectedKeys,
  showLabels,
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
          borderColor: "#FE2B2B",
          borderWidth: showLabels ? 4 : 2,
          backgroundColor: "rgba(200, 52, 56, 0.67)",
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
              size: 14,
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
