import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";

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

// JWT 토큰 만료 관련 인터셉터
// 공통 토큰 재발급 함수 (여기서는 stockAPI를 사용하지만,
// 토큰 재발급 엔드포인트가 있는 다른 인스턴스를 사용할 수도 있습니다) -> refresh 토큰을 헤더에 담아서 보낼거임 Cookie: refresh={refresh_token} 이런식으로 그리고 응답 헤더에는 access: {new_access_token} 이런식으로 돌아올거임
const reissueToken = async (): Promise<string> => {
  const response = await userAPI.post<{ accessToken: string }>("/reissue");
  return response.data.accessToken;
};

// 모든 axios 인스턴스에 인터셉터를 추가하는 함수
const attachInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (
        error.response &&
        error.response.status === 401 &&
        (error.response.data as any)?.message === "Access 토큰 만료"
      ) {
        try {
          // 새로운 access 토큰 재발급
          const newAccessToken = await reissueToken();
          localStorage.setItem("accessToken", newAccessToken);

          // 모든 인스턴스의 기본 헤더 업데이트
          stockAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          portfolioAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          userAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          // error.config가 정의되어 있는지 확인
          if (!error.config) {
            return Promise.reject(error);
          }

          // 기존 요청의 헤더 업데이트 후 재시도
          const originalRequest = error.config as AxiosRequestConfig;
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return apiInstance.request(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
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
