import { CommentsData } from "../../types/commentTypes";
import { Competitor } from "../../types/stockTypes";
import { StockDataType } from "./StockPage";

// 주식 더미
export const dummyStockData: StockDataType = {
  status: 200,
  message: "성공입니다.",
  data: {
    stockInfo: {
      stockId: 24,
      ticker: "005930",
      companyName: "덴티움",
      marketType: "KOSPI",
      currentPrice: 12345,
      marketCap: 5,
      sector: "건강관리장비와용품",
      companyOverview:
        "동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.",

      eps: 8720.0,
      bps: 43695.0,
      pbr: 1.62,
      "1WeekProfitRate": 1000,
      "1YearProfitRate": 1000,
      dividendYeild: 2.47,
      sectorAveragePer: 89.8,
      isBookmark: true,
    },
    snowflakeS: {
      per: 15,
      lbltRate: 2,
      marketCap: 11,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
};
// 댓글 더미
export const commentsData: CommentsData = {
  commentsCnt: 12,
  comments: [
    {
      commentId: 1,
      nickname: "김도은",
      userId: 2,
      content: "댓글내용 1",
      date: "2024.02.18",
    },
    {
      commentId: 2,
      nickname: "이수용",
      userId: 1,
      content: "댓글내용 2",
      date: "2024.02.18",
    },
  ],
};

// 경쟁사 더미
export const dummyCompetitors: Competitor[] = [
  {
    stockId: 1,
    companyName: "삼성전자",
    ticker: "05280",
    snowflakeS: {
      per: 15,
      lblt_rate: 2,
      marketCap: 11,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
  {
    stockId: 2,
    companyName: "sk하이닉스",
    ticker: "05280",
    snowflakeS: {
      per: 15,
      lblt_rate: 2,
      marketCap: 11,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
  {
    stockId: 3,
    companyName: "sk하이닉스",
    ticker: "05280",
    snowflakeS: {
      per: 15,
      lblt_rate: 2,
      marketCap: 11,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
  {
    stockId: 4,
    companyName: "sk하이닉스",
    ticker: "05280",
    snowflakeS: {
      per: 15,
      lblt_rate: 2,
      marketCap: 20,
      divYield: 4,
      foreignerRatio: 8,
    },
  },
];
