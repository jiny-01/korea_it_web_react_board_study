/**
 * 백엔드에 요청 보낼 때 fetch 대신 Axios -> 비동기처리(promise 기반)
 * 요청에 받아온 데이터를 respsonse.data 에서 바로 받아볼 수 있다.
 *
 * 직관적인 에러처리 (404, 500 등 판단)
 * 서버의 API 를 찾을 수 없거나(404), 서버 내부 문제(500) 가
 * 생겼을 때 fetch() 는 이를 성공적인 요청으로 간주하지만 axios 는
 * 서버 에러를 실패로 처리해서 try...catch 구문으로 쉽게 잡아낼 수 있다.
 * 요청/응답 가로채기 -> 인터셉터(Interceptors)
 * 모든 요청이 보내지기 전이나 모든 응답이 도착한 후에
 * 중간 지점에서 공통 작업을 처리할 수 있다.
 * 예를 들어, 모든 요청에 토큰을 자동으로 추가하거나,
 * 특정 에러코드가 오면 자동으로 로그인 페이지로 보내는 등의
 * 처리를 할 수 있다.
 * AXIOS 는 라이브러리 설치해야함
 *
 */

import axios from "axios";

export const fetchPost = async (postId) => {
  try {
    //await 없으면 console.log 실행해 undefined 뜰 것
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    console.log(response.data); //게시물 데이터가 들어있다.
    
    // return response.data; //데이터 반환
  } catch (error) {
    console.log(error);
  }
};

//axios.create : 새 promise 객체, Base_URL 정의
export const jsonInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const instance = axios.create({
  baseURL: "http://localhost:8080",
});
