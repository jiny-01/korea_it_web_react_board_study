//board 관련 Api 모을 폴더

import { instance } from "../utils/instance";

// 게시물 추가 요청
//게시물 작성하려면 토큰 필요 
//-authapi 에서 가져옴 
//-addBoardRequest 로 변경, POST 메소드, data 추가,
export const addBoardRequest = async (data) => {
  instance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;  
    }

    return config;
  });

  try {
    const response = await instance.post("/board/add", data);  
    return response;
  } catch (error) {
    return error.response;
  }  
};

//게시물 데이터 가져오기 요청(게시물 리스트)
export const getBoardList = async () => {
  try {
    const response = await instance.get("/board/list")
    return response;
  } catch (error) {
    return error.response;
  }
}