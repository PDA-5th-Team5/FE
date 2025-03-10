import { APIResponse, userAPI } from ".";

// 회원가입
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

// 회원가입
export const loginAPI = async (
  username: string,
  password: string
): Promise<APIResponse<null>> => {
  // 폼 데이터 구성
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  // 요청
  const response = await userAPI.post<APIResponse<null>>("/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // 응답
  return response.data;
};
