// drawGridOnTop.ts (또는 컴포넌트 내부)
import { Chart, Plugin } from "chart.js";

export const DrawGridOnTop: Plugin<"radar"> = {
  id: "drawGridOnTop",
  afterDatasetsDraw(chart: Chart<"radar">) {
    const { chartArea, scales } = chart;
    if (scales.r) {
      scales.r.draw(chartArea);
    }
  },
};
