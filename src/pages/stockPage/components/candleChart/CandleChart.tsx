import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  CandlestickSeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-financial-charts";
import { apiResponse } from "./api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCandleAPI } from "../../../../apis/stock";
interface CandleDataAPI {
  date: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
}

// 차트 데이터 타입 선언
export interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema12?: number;
  ema26?: number;
  bullPower?: number;
  bearPower?: number;
}

// API 데이터를 CandleData 형식으로 변환
const transformData = (apiData: {
  candleDTOList: Array<{
    date: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    volume: number;
  }>;
}): CandleData[] => {
  return apiData.candleDTOList.map((candle) => ({
    date: candle.date,
    open: candle.openPrice,
    high: candle.highPrice,
    low: candle.lowPrice,
    close: candle.closePrice,
    volume: candle.volume,
  }));
};
const CandleChart: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const stockId = num ? parseInt(num, 10) : 1;

  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const transformedData = transformData(apiResponse);
  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        setIsLoading(true);
        const response = await getCandleAPI(stockId);
        console.log(response);
        if (response.data) {
          const transformedData = transformData(response.data);
          setCandleData(transformedData);
          console.log(stockId);
          console.log(response.data);
        }
      } catch (error) {
        console.error("캔들 차트 데이터 로딩 실패:", error);
        setError("차트 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandleData();
  }, [stockId]);
  // ScaleProvider 설정
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: CandleData) => new Date(d.date)
    );

  const width = 1112;
  const height = 501;
  const margin = { left: 0, right: 48, top: 0, bottom: 24 };

  // EMA 12, EMA 26 설정
  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d: CandleData, c: number) => {
      d.ema12 = c;
    })
    .accessor((d: CandleData) => d.ema12!);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d: CandleData, c: number) => {
      d.ema26 = c;
    })
    .accessor((d: CandleData) => d.ema26!);
  const ema12Data = ema12(candleData || []);
  const ema26Data = ema26(ema12Data);
  const elder = elderRay();
  //  const calculatedData = elder(ema26(ema12(transformedData || [])));
  const calculatedData = elder(ema26Data);
  const filteredData = calculatedData.filter(
    (d: CandleData) => d.ema12 != null || d.ema26 != null
  );
  // const filteredData = calculatedData.filter(
  //   (d: CandleData) => d.ema12 != null || d.ema26 != null
  // );

  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(filteredData);
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;
  const elderRayHeight = 100;
  const chartHeight = gridHeight - elderRayHeight;
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  // 캔들 차트 영역 데이터 범위
  const candleChartExtents = (d: CandleData) => [d.high, d.low];
  const yEdgeIndicator = (d: CandleData) => d.close;
  const openCloseColor = (d: CandleData) =>
    d.close > d.open ? "#E74142" : "#2D7AFF";

  return (
    <>
      {data && data.length > 0 ? (
        <ChartCanvas
          height={height}
          ratio={3}
          width={width}
          margin={margin}
          data={data}
          displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          xExtents={xExtents}
          zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis
              showGridLines
              tickLabelFill="#fff"
              gridLinesStrokeStyle="#353535"
              tickStrokeStyle="#fff"
              strokeStyle="#fff"
            />
            <YAxis
              showGridLines
              tickFormat={pricesDisplayFormat}
              tickLabelFill="#fff"
              gridLinesStrokeStyle="#353535"
              tickStrokeStyle="#fff"
              strokeStyle="#fff"
            />
            <CandlestickSeries
              fill={(d) => (d.close > d.open ? "#E74142" : "#2D7AFF")}
              wickStroke={(d) => (d.close > d.open ? "#E74142" : "#2D7AFF")}
            />
            <LineSeries
              yAccessor={ema26.accessor()}
              strokeStyle={ema26.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries
              yAccessor={ema12.accessor()}
              strokeStyle={ema12.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            />
            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              textFill="#ffffff"
              labelFill="#ffffff"
              options={[
                {
                  yAccessor: ema26.accessor(),
                  type: "EMA",
                  stroke: ema26.stroke(),
                  windowSize: ema26.options().windowSize,
                },
                {
                  yAccessor: ema12.accessor(),
                  type: "EMA",
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize,
                },
              ]}
            />
            <OHLCTooltip origin={[8, 16]} textFill="#ffffff" />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      ) : (
        <>데이터 로딩 중..</>
      )}
    </>
  );
};

export default CandleChart;
