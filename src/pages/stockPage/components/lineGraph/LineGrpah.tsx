import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { apiResponse } from "./data";
import { Cursor } from "react-financial-charts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

type MarketData = {
  market: string;
  price?: { [key: string]: number };
  closePrice?: { [key: string]: number };
};

type LineGraphData = {
  status: number;
  message: string;
  data: {
    lineGraph: MarketData[];
  };
};

// YYYYMMDD 문자열을 Date 객체로 변환하는 함수
const convertDate = (dateStr: string): Date => {
  const year = Number(dateStr.slice(0, 4));
  const month = Number(dateStr.slice(4, 6)) - 1; // JS에서는 0부터 시작
  const day = Number(dateStr.slice(6, 8));
  return new Date(year, month, day);
};

const ChartComponent: React.FC = () => {
  // 각 시장별 데이터를 처리하여 chart.js의 dataset 형식으로 변환
  const datasets = apiResponse.data.lineGraph.map((item) => {
    const key = item.price ? "price" : "closePrice";
    const dataPoints = Object.entries(item[key] || {})
      .map(([dateStr, value]) => ({
        x: convertDate(dateStr),
        y: value,
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime());

    let borderColor;
    let customLabel;
    if (item.market === "KOSPI") {
      borderColor = "#D44F48";
    } else if (item.market === "KOSDAQ") {
      borderColor = "#E5B443";
    } else {
      borderColor = "#63C685";
      customLabel = "종가";
    }

    return {
      label: customLabel ?? item.market,
      data: dataPoints,
      fill: false,
      borderColor,
      tension: 0.3,
    };
  });

  const options = {
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "month" as const,
          displayFormats: {
            month: "M월" as const,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "가격",
        },
      },
    },
    plugins: {
      dragData: false,
      legend: {
        labels: {
          // 항목 간 간격
          padding: 40,
        },
      },
    },
  };

  const chartData = {
    datasets: datasets,
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
