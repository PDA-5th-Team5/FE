import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// 공통 응답 타입 정의
export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const stockAPI = axios.create({
  baseURL: `${baseURL}/stock/api/stocks`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const portfolioAPI = axios.create({
  baseURL: `${baseURL}/portfolio/api/portfolio`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userAPI = axios.create({
  baseURL: `${baseURL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
});
