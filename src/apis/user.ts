import { APIResponse, userAPI } from ".";

export const signupAPI = async (
  username: string,
  password: string,
  email: string,
  nickname: string
): Promise<APIResponse<null>> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("nickname", nickname);
  formData.append("email", email);

  const response = await userAPI.post<APIResponse<null>>("/join", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
