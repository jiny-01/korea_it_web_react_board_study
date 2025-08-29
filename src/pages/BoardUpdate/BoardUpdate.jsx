import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { getBoardDetail, updateBoardRequest } from "../../apis/board/boardApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//게시판 수정 페이지
function BoardUpdate() {
  //   const [newBoardData, setNewBoardData] = useState({});
  const [boardData, setBoardData] = useState({
    title: "",
    content: "",
  });
  const { boardId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);

  // 게시글 수정 요청 (useMutation)
  const updateBoardMutation = useMutation({
		mutationKey: "updateBoard",
		mutationFn: updateBoardRequest,
		onSuccess: (response) => {
			if (response.data.status === "success") {
				alert(response.data.message);
				navigate("/board");
			} else if (response.data.status === "failed") {
				alert(response.data.message);
				return;
			}
		},
		onError: (error) => {
			alert("문자가 발생했습니다. 다시 시도해주세요.");
			return;
		},
	});

	const updateOnClickHandler = () => {
		if (
			boardData.title.trim().length === 0 ||
			boardData.content.trim().length === 0
		) {
			alert("모든 항목을 입력해주세요.");
			return;
		}

		updateBoardMutation.mutate({
			title: boardData.title,
			content: boardData.content,
			boardId: boardId,
		});
	};

	useEffect(() => {
		getBoardDetail(boardId).then((response) => {
			if (response.data.status === "success") {
				if (
					principalData.data.data.userId !== response.data.data.userId
				) {
					alert("잘못된 접근입니다.");
					navigate("/board");
				}
				setBoardData(response.data.data);
			} else if (response.data.status === "failed") {
				alert(response.data.message);
				navigate("/board");
			}
		});
	}, [boardId, principalData, navigate]);

  //1. 수정 전 일단 단건조회로 원래 데이터를 가져옴
  // 이때 detatil 에서 boardId 가지고 있으므로 파라미터로 넘겨줌
  // 단건 조회한 거 setBoardData 로 상태에 저장
  // 주의 : 마운트될 시점에는 요청이 들어와 set 안되어있을 수 있으므로
  //        상태 정의 시 빈 객체로 둬야함
  //title 태그 -> onChange : 원래있던 boardData 는 가져오고, title 만 바꿔라
  //content 태그 -> onChange : 원래있던 boardData 는 가져오고, content 만 변경
  //useMutation  사용해서 새로운 객체를 만들어서 요청 보냄
  
  

  console.log(principalData.data.data.userId);
  console.log(boardData.userId);

  return (
    <div css={s.container}>
      <input
        type="text"
        value={boardData.title}
        placeholder="제목을 입력해주세요."
        onChange={(e) => {
          setBoardData({ ...boardData, title: e.target.value });
        }}
      />
      <textarea
        name=""
        id=""
        placeholder="내용을 입력해주세요."
        value={boardData.content}
        onChange={(e) => {
          setBoardData({
            ...boardData,
            content: e.target.value,
          });
        }}
      ></textarea>
      <div css={s.btnBox}>
        <button onClick={updateOnClickHandler}>수정하기</button>
      </div>
    </div>
  );
}

export default BoardUpdate;
