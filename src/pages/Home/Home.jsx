import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { fetchPost } from "../../apis/utils/instance";
import { getPostRequest } from "../../apis/json/jsonApi";

function Home() {
  //HOME 화면 뜰 때 fetchPost로 요청 보낼 것
  //instance 에 공통적으로 정의해둠
  //이때 postId 를 매개변수로 함
  // fetchPost(1)
  getPostRequest(1)
    .then((response) => {
      console.log(response.data); //jsonApi 에 해둔 response 반환 -> 반환받은 response 가져와서 출력
    })
    .catch((error) => {
      console.log(error);
    });
  return <div>Home</div>;
}

export default Home;
