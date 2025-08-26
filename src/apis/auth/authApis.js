import { instance } from "../utils/instance";

//Auth 관련 api, 함수 모아둘 파일


export const getPrincipalRequest = async () => {
  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;  
    }

    return config;
  });

  try {
    const response = await instance.get("/auth/principal");  
    return response;
  } catch (error) {
    return error.response;
  }  
};

//회원가입
export const signupRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//로그인
export const signinRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signin", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

//oauth 회원가입
export const oauth2SignupRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/signup", data)
    return response;
  } catch (error) {
    return error.response
  }
}

//oauth 로그인 연동
export const oauth2MergeRequest = async (data) => {
  try {
    const response = await instance.post("/oauth2/merge", data)
    return response;
  } catch (error) {
    return error.response
  }
}
