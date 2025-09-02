import { instance } from "../utils/instance";

//비밀번호 변경
export const changePasswordRequest = async (data) => {
  try {
    const response = await instance.post("/account/change/password", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//이메일 인증
export const sendMailRequest = async (data) => {
  try {
    const response = await instance.post("mail/send", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
