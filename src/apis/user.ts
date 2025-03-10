import { APIResponse, userAPI } from ".";

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
