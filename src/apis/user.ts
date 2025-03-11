import { APIResponse, userAPI, stockAPI, portfolioAPI } from ".";
import { FilterStock } from "../types/stockTypes";

const refreshToken = localStorage.getItem("refreshToken");

// 로그인 응답
export interface LoginUser {
  userId: string;
  nickname: string;
  email: string;
}

// 프로필 수정 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  email: string;
}

// 댓글 데이터 관련 타입 정의
export interface Comment {
  connectId: number;
  name: string;
  commentId: number;
  content: string;
  date: string;
}

// 나의 댓글 응답 데이터 타입
export interface MyCommentsResponseData {
  commentsS: Comment[]; // 종목에 단 댓글
  commentsP: Comment[]; // 공유 포트폴리오에 단 댓글
}

// 나의 종목 응답 데이터 타입
export interface MyStocksResponseData {
  stockCnt: number;
  stockInfos: FilterStock[];
}

// 회원가입 (POST)
export const signupAPI = async (
  username: string,
  password: string,
  email: string,
  nickname: string
): Promise<APIResponse<null>> => {
  // 폼 데이터 구성
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("nickname", nickname);
  formData.append("email", email);

  // 요청
  const response = await userAPI.post<APIResponse<null>>("/join", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // 응답
  return response.data;
};

// 로그인 (POST)
export const loginAPI = async (
  username: string,
  password: string
): Promise<APIResponse<LoginUser>> => {
  // 폼 데이터 구성
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  // 요청
  const response = await userAPI.post<APIResponse<LoginUser>>(
    "/login",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // local storage와 각 헤더에 Access 토큰 설정
  // 응답 헤더에서 'Authorization' 추출
  const accessToken = response.headers["access"];
  const refreshToken = response.headers["refresh"];
  //   console.log(accessToken);
  //   console.log(refreshToken);

  if (accessToken) {
    // 토큰 저장 (예: localStorage 사용)
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // console.log(accessToken);
    console.log(accessToken);
    console.log(refreshToken);

    document.cookie = `refresh=${refreshToken}; path=/;`;
    // document.cookie = `refresh=${refreshToken}; path=/; SameSite=None`;

    // 모든 axios 인스턴스의 기본 헤더에 토큰 설정
    stockAPI.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    portfolioAPI.defaults.headers.common["Authorization"] =
      `Bearer ${accessToken}`;
    userAPI.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  // 응답
  return response.data;
};

// 로그아웃 (POST)
export const logoutAPI = async (): Promise<APIResponse<null>> => {
  // 요청
  const response = await userAPI.post<APIResponse<null>>(
    "/logout",
    null, // 본문(body) 데이터가 없을 경우 null
    {
      headers: {
        refresh: refreshToken,
      },
    }
  );
  // 응답
  return response.data;
};

// 프로필 업데이트 (POST)
export const updateProfileAPI = async (
  nickname: string,
  email: string
): Promise<APIResponse<null>> => {
  const body: UpdateProfileRequest = { nickname, email };

  const response = await userAPI.patch<APIResponse<null>>("/profile", body);

  return response.data;
};

// 나의 댓글 API (GET)
export const commentsAPI = async (): Promise<
  APIResponse<MyCommentsResponseData>
> => {
  const response =
    await userAPI.get<APIResponse<MyCommentsResponseData>>("/comments");
  return response.data;
};

// 나의 종목 API (GET)
export const stocksAPI = async (): Promise<
  APIResponse<MyStocksResponseData>
> => {
  const response =
    await userAPI.get<APIResponse<MyStocksResponseData>>("/stocks");
  return response.data;
};
