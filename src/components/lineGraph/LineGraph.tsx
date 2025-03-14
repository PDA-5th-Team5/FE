import { Line } from "react-chartjs-2";
import * as S from "../stock/result/StockResult.styled";

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
import { PulseLoader } from "react-spinners";

interface LineGraphItem {
  market?: string;
  portfolioTitle?: string;
  price?: { [date: string]: number };
  closePrice?: { [date: string]: number };
  avgClosePrice?: { [date: string]: number };
}
export interface LineGraphDataPoint {
  date: string;
  value: number;
}

export interface LineGraphData {
  status: number;
  message: string;
  data: LineGraphItem[];
}

interface LineGraphProps {
  data: LineGraphData;
  loading?: boolean;
}

// YYYYMMDD 문자열을 Date 객체로 변환하는 함수
const convertDate = (dateStr: string): Date => {
  const year = Number(dateStr.slice(0, 4));
  const month = Number(dateStr.slice(4, 6)) - 1; // JS에서는 0부터 시작
  const day = Number(dateStr.slice(6, 8));
  return new Date(year, month, day);
};

const LineGraph = ({ data, loading = false }: LineGraphProps) => {
  if (loading || !data || !data.data) {
    return (
      <S.LoadingLineResultContainer>
        <PulseLoader size={10} color="#2595E0" />
      </S.LoadingLineResultContainer>
    );
  }
  // if (loading) {
  //   return (
  //     <S.LoadingResultContainer>
  //       <PulseLoader size={10} color="#2595E0" />
  //     </S.LoadingResultContainer>
  //   );
  // }
  const datasets = data.data.map((item) => {
    let key: keyof LineGraphItem | "" = "";
    if (item.price) {
      key = "price";
    } else if (item.avgClosePrice) {
      key = "avgClosePrice";
    } else if (item.closePrice) {
      key = "closePrice";
    }
    const dataPoints = key
      ? Object.entries(item[key] || {})
          .map(([dateStr, value]) => ({
            x: convertDate(dateStr),
            y: value,
          }))
          .sort((a, b) => a.x.getTime() - b.x.getTime())
      : [];

    let borderColor;
    let customLabel;
    if (item.market === "KOSPI" || item.market === "ALL") {
      borderColor = "#D44F48";
      customLabel = "KOSPI";
    } else if (item.market === "KOSDAQ") {
      borderColor = "#E5B443";
    } else {
      borderColor = "#63C685";
      customLabel = item.avgClosePrice ? "종가 평균" : "종가";
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
export default LineGraph;
