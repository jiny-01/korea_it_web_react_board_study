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

export const signupRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signup", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const signinRequest = async (data) => {
  try {
    const response = await instance.post("/auth/signin", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
