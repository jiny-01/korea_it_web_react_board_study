/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addBoardRequest } from "../../apis/board/boardApis";
import { usePrincipalState } from "../../store/usePrincipalStore";

function Write() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const queryClient = useQueryClient();
  // const principalData = queryClient.getQueryData(["getPrincipal"]);
  //로그인되어있는지 확인, userId 필요하기 때문 - queryClient, principalData 가져옴

  //대신 zustand 이용
  const {isLoggedIn, principal} = usePrincipalState();

  const addBoardMutation = useMutation({
    mutationKey: "addBoard",
    mutationFn: addBoardRequest,
    onSuccess: (response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate("/board");
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        return;
      }
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      return;
    },
  });
  const addOnClickHandler = () => {
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    console.log(principal.userId);

    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/auth/signin");
      return;
    }

    //***
    // useMutation - POST 요청에 주로 쓰임(Get 요청에는 XX)
    //body 에 들어갈 데이터들 명시(요청할 때 데이터 형식으로)
    //성공/실패 분기를 미리 잡아줄 수 있음(onSuccess, onError)
    //.mutate 했을 시점에 요청보냄
    //ex) 마이페이지 닉넴 변경 - 바로 상태에 반영(다시 새로고침하지않아도 onSuccess에 principaldata 에 바로 상태반영가능)
    //***

    addBoardMutation.mutate({
      title: title,
      content: content,
      userId: principal.userId,
    });
  };
  return (
    <div css={s.container}>
      <input
        type="text"
        value={title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        name=""
        id=""
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <div css={s.btnBox}>
        <button onClick={addOnClickHandler}>게시하기</button>
      </div>
    </div>
  );
}

export default Write;
