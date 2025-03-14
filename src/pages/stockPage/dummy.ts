// import { CommentsData } from "../../types/commentTypes";
// import { Competitor } from "../../types/stockTypes";
// import { StockDataType } from "./StockPage";

// // 주식 더미
// export const dummyStockData: StockDataType = {
//   status: 200,
//   message: "성공입니다.",
//   data: {
//     stockInfo: {
//       stockId: 24,
//       ticker: "005930",
//       companyName: "덴티움",
//       marketType: "KOSPI",
//       currentPrice: 12345,
//       marketCap: "5",
//       sector: "건강관리장비와용품",
//       companyOverview:
//         "동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.동사는 2000년 설립되어 임플란트 제품을 주력으로 치과용 의료기기 및 생체재료를 Total Solution으로 개발, 생산, 판매하고 있음. 임플란트 전체 치료 과정 Package 판매 확대를 통해 매출 성장과 수익성을 확대해 나가고 있음. 동남아시아 등 해외시장에 적극적인 투자를 통한 성장동력 확보와 유통경로 다각화, 영업력 강화를 통해 지속적인 성장과 높은 수익성을 달성할 계획임.",

//       eps: 8720.0,
//       bps: 43695.0,
//       pbr: 1.62,
//       "1WeekProfitRate": 1000,
//       "1YearProfitRate": 1000,
//       dividendYeild: 2.47,
//       sectorAveragePer: '89.8',
//       isBookmark: true,
//     },
//     snowflakeS: {
//       per: 15,
//       lbltRate: 2,
//       marketCap: 11,
//       dividendYield: 4,
//       foreignerRatio: 8,
//     },
//   },
// };
// // 댓글 더미
// export const commentsData: CommentsData = {
//   commentsCnt: 12,
//   comments: [
//     {
//       commentId: 1,
//       nickname: "김도은",
//       userId: 2,
//       content: "댓글내용 1",
//       date: "2024.02.18",
//     },
//     {
//       commentId: 2,
//       nickname: "이수용",
//       userId: 1,
//       content: "댓글내용 2",
//       date: "2024.02.18",
//     },
//   ],
// };

// // 경쟁사 더미
// export const dummyCompetitors: Competitor[] = [
//   {
//     stockId: 1,
//     companyName: "삼성전자",
//     ticker: "05280",
//     snowflakeS: {
//       per: 15,
//       lblt_rate: 2,
//       marketCap: 11,
//       dividendYield: 4,
//       foreignerRatio: 8,
//     },
//   },
//   {
//     stockId: 2,
//     companyName: "sk하이닉스",
//     ticker: "05280",
//     snowflakeS: {
//       per: 15,
//       lblt_rate: 2,
//       marketCap: 11,
//       dividendYield: 4,
//       foreignerRatio: 8,
//     },
//   },
//   {
//     stockId: 3,
//     companyName: "sk하이닉스",
//     ticker: "05280",
//     snowflakeS: {
//       per: 15,
//       lblt_rate: 2,
//       marketCap: 11,
//       dividendYield: 4,
//       foreignerRatio: 8,
//     },
//   },
//   {
//     stockId: 4,
//     companyName: "sk하이닉스",
//     ticker: "05280",
//     snowflakeS: {
//       per: 15,
//       lblt_rate: 2,
//       marketCap: 20,
//       dividendYield: 4,
//       foreignerRatio: 8,
//     },
//   },
// ];

// export const stockLineGraph = {
//   status: 200,
//   message: "성공입니다.",
//   data: {
//     lineGraph: [
//       {
//         market: "KOSPI",
//         price: {
//           // January
//           "20230101": 53000,
//           "20230110": 53500,
//           "20230131": 54100,
//           // February
//           "20230201": 54150,
//           "20230210": 54400,
//           "20230228": 54800,
//           // March
//           "20230301": 54850,
//           "20230310": 55200,
//           "20230331": 55650,
//           // April
//           "20230401": 55700,
//           "20230410": 56000,
//           "20230430": 56500,
//           // May
//           "20230501": 56550,
//           "20230510": 56700,
//           "20230531": 57000,
//           // June
//           "20230601": 57050,
//           "20230610": 57200,
//           "20230630": 57500,
//           // July
//           "20230701": 57550,
//           "20230710": 57700,
//           "20230731": 58000,
//           // August
//           "20230801": 58050,
//           "20230810": 58200,
//           "20230831": 58500,
//           // September
//           "20230901": 58550,
//           "20230910": 58700,
//           "20230930": 59000,
//           // October
//           "20231001": 59050,
//           "20231010": 59200,
//           "20231031": 59500,
//           // November
//           "20231101": 59550,
//           "20231110": 59700,
//           "20231130": 60000,
//           // December
//           "20231201": 60050,
//           "20231210": 60200,
//           "20231231": 60500,
//         },
//       },
//       {
//         market: "KOSDAQ",
//         price: {
//           // January
//           "20230101": 2300,
//           "20230110": 2350,
//           "20230131": 2405,
//           // February
//           "20230201": 2410,
//           "20230210": 2430,
//           "20230228": 2460,
//           // March
//           "20230301": 2470,
//           "20230310": 2515,
//           "20230331": 2560,
//           // April
//           "20230401": 2565,
//           "20230410": 2580,
//           "20230430": 2600,
//           // May
//           "20230501": 2605,
//           "20230510": 2620,
//           "20230531": 2640,
//           // June
//           "20230601": 2645,
//           "20230610": 2660,
//           "20230630": 2680,
//           // July
//           "20230701": 2685,
//           "20230710": 2700,
//           "20230731": 2720,
//           // August
//           "20230801": 2725,
//           "20230810": 2740,
//           "20230831": 2760,
//           // September
//           "20230901": 2765,
//           "20230910": 2780,
//           "20230930": 2800,
//           // October
//           "20231001": 2805,
//           "20231010": 2820,
//           "20231031": 2840,
//           // November
//           "20231101": 2845,
//           "20231110": 2860,
//           "20231130": 2880,
//           // December
//           "20231201": 2885,
//           "20231210": 2900,
//           "20231231": 2920,
//         },
//       },
//       {
//         market: "StockPrice",
//         closePrice: {
//           // January
//           "20230101": 150000,
//           "20230110": 152000,
//           "20230131": 155250,
//           // February
//           "20230201": 155500,
//           "20230210": 156500,
//           "20230228": 158250,
//           // March
//           "20230301": 158500,
//           "20230310": 160750,
//           "20230331": 163000,
//           // April
//           "20230401": 163250,
//           "20230410": 164500,
//           "20230430": 166000,
//           // May
//           "20230501": 166250,
//           "20230510": 167500,
//           "20230531": 169000,
//           // June
//           "20230601": 169250,
//           "20230610": 170500,
//           "20230630": 172000,
//           // July
//           "20230701": 172250,
//           "20230710": 173500,
//           "20230731": 175000,
//           // August
//           "20230801": 175250,
//           "20230810": 176500,
//           "20230831": 178000,
//           // September
//           "20230901": 178250,
//           "20230910": 179500,
//           "20230930": 181000,
//           // October
//           "20231001": 181250,
//           "20231010": 182500,
//           "20231031": 184000,
//           // November
//           "20231101": 184250,
//           "20231110": 185500,
//           "20231130": 187000,
//           // December
//           "20231201": 187250,
//           "20231210": 188500,
//           "20231231": 190000,
//         },
//       },
//     ],
//   },
// };
