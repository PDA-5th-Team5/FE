// import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;

// // 공통 응답 타입 정의
// export interface APIResponse<T> {
//   status: number;
//   message: string;
//   data: T;
// }

// export const stockAPI = axios.create({
//   baseURL: `${baseURL}/stock/api/stocks`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// export const portfolioAPI = axios.create({
//   baseURL: `${baseURL}/portfolio/api/portfolio`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// export const userAPI = axios.create({
//   baseURL: `${baseURL}/user`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // JWT 토큰 만료 관련 인터셉터
// // 공통 토큰 재발급 함수 (여기서는 stockAPI를 사용하지만,
// // 토큰 재발급 엔드포인트가 있는 다른 인스턴스를 사용할 수도 있습니다) -> refresh 토큰을 헤더에 담아서 보낼거임 Cookie: refresh={refresh_token} 이런식으로 그리고 응답 헤더에는 access: {new_access_token} 이런식으로 돌아올거임
// const reissueToken = async (): Promise<string> => {
//   const response = await userAPI.post<APIResponse<null>>("/reissue");

//   const accessToken = response.headers["access"];

//   return accessToken;
// };

// // 모든 axios 인스턴스에 인터셉터를 추가하는 함수
// const attachInterceptor = (apiInstance: AxiosInstance) => {
//   apiInstance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       if (
//         error.response &&
//         error.response.status === 401 &&
//         (error.response.data as any)?.message === "Access 토큰 만료"
//       ) {
//         try {
//           // 새로운 access 토큰 재발급
//           const newAccessToken = await reissueToken();
//           localStorage.setItem("accessToken", newAccessToken);

//           // 모든 인스턴스의 기본 헤더 업데이트
//           stockAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;
//           portfolioAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;
//           userAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;

//           // error.config가 정의되어 있는지 확인
//           if (!error.config) {
//             return Promise.reject(error);
//           }

//           // 기존 요청의 헤더 업데이트 후 재시도
//           const originalRequest = error.config as AxiosRequestConfig;
//           originalRequest.headers = {
//             ...originalRequest.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           };

//           return apiInstance.request(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// // 각 axios 인스턴스에 인터셉터 등록
// attachInterceptor(stockAPI);
// attachInterceptor(portfolioAPI);
// attachInterceptor(userAPI);

import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
let accessToken = localStorage.getItem("accessToken");
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
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const portfolioAPI = axios.create({
  baseURL: `${baseURL}/portfolio/api/portfolio`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const userAPI = axios.create({
  baseURL: `${baseURL}/user`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
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
  const accessToken = response.headers["access"];
  return accessToken;
};

// 모든 axios 인스턴스에 인터셉터를 추가하는 함수
const attachInterceptor = (apiInstance: AxiosInstance) => {
  // ===== 요청 인터셉터 (Request Interceptor) =====
  apiInstance.interceptors.request.use(
    (config) => {
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
          accessToken = newAccessToken;

          stockAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          portfolioAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          userAPI.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

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
      console.log("Response Interceptor - Success:", response);
      return response;
    },
    (error: AxiosError) => {
      console.log("Response Interceptor - Error:", error);
      return Promise.reject(error);
    }
  );
};

// const reissueToken = async (): Promise<string> => {
//   const response = await userAPI.post<APIResponse<null>>("/reissue", null, {
//     headers: {
//       refresh: refreshToken,
//     },
//   });
//   const accessToken = response.headers["access"];
//   return accessToken;
// };

// // 모든 axios 인스턴스에 인터셉터를 추가하는 함수
// const attachInterceptor = (apiInstance: AxiosInstance) => {
//   // ===== 요청 인터셉터 (Request Interceptor) =====
//   apiInstance.interceptors.request.use(
//     (config) => {
//       console.log("Request Interceptor - Success:", config);
//       return config;
//     },
//     (error) => {
//       console.log("Request Interceptor - Error:", error);
//       return Promise.reject(error);
//     }
//   );

//   // ===== 응답 인터셉터 (Response Interceptor) =====
//   apiInstance.interceptors.response.use(
//     (response) => {
//       console.log("Response Interceptor - Success:", response);
//       return response;
//     },
//     async (error: AxiosError) => {
//       console.log("Response Interceptor - Error:", error);
//       console.log("에러: ", error.response);

//       // 401 & "Access 토큰 만료"인 경우 토큰 재발급
//       if (
//         error.response &&
//         // error.response.status === 400
//         error.response.status === 401
//       ) {
//         try {
//           console.log("Trying to reissue token...");
//           const newAccessToken = await reissueToken();
//           localStorage.setItem("accessToken", newAccessToken);

//           stockAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;
//           portfolioAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;
//           userAPI.defaults.headers.common["Authorization"] =
//             `Bearer ${newAccessToken}`;

//           if (!error.config) {
//             console.log("Error config is undefined. Cannot retry request.");
//             return Promise.reject(error);
//           }

//           const originalRequest = error.config as AxiosRequestConfig;
//           originalRequest.headers = {
//             ...originalRequest.headers,
//             Authorization: `Bearer ${newAccessToken}`,
//           };

//           console.log("Retrying original request with new access token...");
//           return apiInstance.request(originalRequest);
//         } catch (refreshError) {
//           console.log("Token reissue failed:", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// 각 axios 인스턴스에 인터셉터 등록
attachInterceptor(stockAPI);
attachInterceptor(portfolioAPI);
attachInterceptor(userAPI);
