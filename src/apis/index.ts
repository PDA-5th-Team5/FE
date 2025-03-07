import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

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
