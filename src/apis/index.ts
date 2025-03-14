import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const refreshToken = localStorage.getItem("refreshToken");

export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 재시도 횟수를 관리하기 위해 타입 확장
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retryCount?: number;
}

export const stockAPI = axios.create({
  baseURL: `${baseURL}/stock/api/stocks`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const portfolioAPI = axios.create({
  baseURL: `${baseURL}/portfolio/api/portfolio`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const userAPI = axios.create({
  baseURL: `${baseURL}/user`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const reissueToken = async (): Promise<string> => {
  const response = await userAPI.post<APIResponse<null>>("/reissue", null, {
    headers: {
      refresh: refreshToken,
    },
  });
  const newAccessToken = response.headers["access"];
  return newAccessToken;
};

// 모든 axios 인스턴스에 인터셉터를 추가하는 함수
const attachInterceptor = (apiInstance: AxiosInstance) => {
  // ===== 요청 인터셉터 (Request Interceptor) =====
  apiInstance.interceptors.request.use(
    (config) => {
      if (sessionStorage.getItem("isLoggedIn") === "true") {
        console.log("로그인 되어있음 :", config);
        const token = localStorage.getItem("accessToken");
        if (config.headers) {
          console.log("토큰넣기 :", config);
          config.headers.Authorization = `Bearer ${token}`;
        }
      } else {
        if (config.headers) {
          console.log("토큰 null 삭제 :", config);
          delete config.headers.Authorization;
        }
      }
      console.log("Request Interceptor - Success:", config);
      return config;
    },
    (error) => {
      console.log("Request Interceptor - Error:", error);
      return Promise.reject(error);
    }
  );

  // ===== 응답 인터셉터 (Response Interceptor) =====
  apiInstance.interceptors.response.use(
    async (response) => {
      if (
        response.data &&
        response.data.status === 401 &&
        response.data.message === "Access 토큰 만료"
      ) {
        try {
          console.log("Trying to reissue token...");
          const newAccessToken = await reissueToken();
          localStorage.setItem("accessToken", newAccessToken);

          // 각 인스턴스의 기본 Authorization 헤더 업데이트
          stockAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          portfolioAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          userAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          // 원래 요청의 헤더도 업데이트 후 재시도
          const originalRequest = response.config as CustomAxiosRequestConfig;
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          console.log("Retrying original request with new access token...");
          return apiInstance.request(originalRequest);
        } catch (refreshError) {
          console.log("Token reissue failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      console.log("Response Interceptor - Success:", response);
      return response;
    },
    async (error: AxiosError) => {
      console.log("Response Interceptor - Error:", error);

      // 재시도 요청 처리 (2번) -> 최초 요청 1번 + 재시도 2번: 총 3번까지
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (originalRequest) {
        originalRequest._retryCount = originalRequest._retryCount || 0;
        if (originalRequest._retryCount < 2) {
          originalRequest._retryCount++;
          console.log(
            `Retrying failed request... attempt ${originalRequest._retryCount}`
          );
          try {
            return await apiInstance.request(originalRequest);
          } catch (retryError) {
            console.log("Retry attempt failed:", retryError);
            return Promise.reject(retryError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

// 각 axios 인스턴스에 인터셉터 등록
attachInterceptor(stockAPI);
attachInterceptor(portfolioAPI);
attachInterceptor(userAPI);
