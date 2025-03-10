import { APIResponse, userAPI, stockAPI, portfolioAPI } from ".";

// 로그인 응답
export interface LoginUser {
  userId: string;
  nickname: string;
  email: string;
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
  console.log(accessToken);

  if (accessToken) {
    // 토큰 저장 (예: localStorage 사용)
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken);

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
  const response = await userAPI.post<APIResponse<null>>("/logout");

  // 응답
  return response.data;
};
