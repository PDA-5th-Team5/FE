import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const refreshToken = localStorage.getItem("refreshToken");

export interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const stockAPI = axios.create({
  baseURL: `${baseURL}/stock/api/stocks`,
  headers: {
    "Content-Type": "application/json",
    // 초기에는 인터셉터에서 헤더를 처리하므로 기본값 설정은 생략할 수 있습니다.
    // Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const portfolioAPI = axios.create({
  baseURL: `${baseURL}/portfolio/api/portfolio`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const userAPI = axios.create({
  baseURL: `${baseURL}/user`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

/*
<지금 문제 정리>
401 에러(API-gateway에서 토큰 만료 관련 에러) 뜰 때, reissue 쏘는 것까지는 OK.
근데 쿠키에 있는 refresh 토큰값을 자동으로 헤더에 넣어서 쏴줘야하는데,
그게 동작을 안함. 그것만 되면 될듯.
*/

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
      // sessionStorage의 isLoggedIn 값을 확인하여 Authorization 헤더를 추가 또는 삭제합니다.
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
          const originalRequest = response.config as AxiosRequestConfig;
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

      // // 403 (Access 토큰 null)
      // if (
      //   response.data &&
      //   response.data.status === 403 &&
      //   response.data.message === "Access 토큰이 없습니다."
      // ) {
      //   console.log("Access 토큰이 없습니다. 로그인 페이지로 이동합니다.");
      //   localStorage.removeItem("accessToken");
      //   localStorage.removeItem("refreshToken");
      //   window.location.href = "/login"; // 로그인 페이지로 이동
      //   return Promise.reject(new Error("Access 토큰이 없습니다."));
      // }

      console.log("Response Interceptor - Success:", response);
      return response;
    },
    (error: AxiosError) => {
      console.log("Response Interceptor - Error:", error);
      return Promise.reject(error);
    }
  );
};

// 각 axios 인스턴스에 인터셉터 등록
attachInterceptor(stockAPI);
attachInterceptor(portfolioAPI);
attachInterceptor(userAPI);
