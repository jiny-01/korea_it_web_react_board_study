/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";
import { useNavigate, useParams } from "react-router-dom";

import { removeBoard, getBoardDetail } from "../../apis/board/boardApis";
// import { useQueryClient } from "@tanstack/react-query";
import { usePrincipalState } from "../../store/usePrincipalStore";

function BoardDetail() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [boardData, setBoardData] = useState({});
  // const [updateBoard, setUpdateBoard] = useState({
  //   boardId: boardData.boardId,
  //     title: boardData.title,
  //     content: boardData.content,
  // });
  // const queryClient = useQueryClient();
  // const principalData = queryClient.getQueryData(["getPrincipal"]);
  //대신 zustand 이용
  const {isLoggedIn, principal} = usePrincipalState();

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getBoardDetail(boardId).then((response) => {
      if (response.data.status === "success") {
        setBoardData(response.data.data);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
        navigate("/board");
      }
    });
  }, [boardId, navigate]);
  //boardId 들어온 시점에 navigate 가 없으면 안되기 때문에 2개를 인자로 받음

  console.log("principal userId:", principalData?.data?.data?.userId);
  console.log("board userId:", boardData?.userId);

  //목록 눌렀을 때 게시판으로 이동하는 기능
  const backOnClickHandler = () => {
    navigate("/board");
  };

  //게시물 삭제 시도 -> 삭제 완료되면 다시 게시판으로 보냄
  const removeHandler = () => {
    if (!boardData) return;

    removeBoard(boardData.boardId).then((response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate(`/board?page=${currentPage}`);
      } else {
        alert(response.data.message);
      }
    });
  };

  //게시물 수정 기능
  const updateHandler = () => {
    navigate(`/board/update/${boardData.boardId}`);
  };

  return (
    <div css={s.container}>
      <div css={s.boardContainer}>
        <div css={s.boardHeader}>
          <h3>{boardData.title}</h3>
          <span>{boardData?.createDt?.split("T")[0]}</span>
        </div>

        <div css={s.boardContent}>{boardData.content}</div>
      </div>
      <div css={s.btnContainer}>
        <button css={s.btn("#6c757d")} onClick={backOnClickHandler}>
          목록
        </button>
        {principal.userId &&
        boardData?.userId &&
        principal.userId === boardData.userId ? (
          <div>
            <button
              css={s.btn("#dc3545")}
              onClick={() => {
                removeHandler(boardId);
              }}
            >
              삭제
            </button>
            <button
							css={s.btn("#0d6efd")}
							onClick={() => navigate(`/board/update/${boardId}`)}
						>
							수정
						</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default BoardDetail;

//데이터 있는데 계속 undefined 나오면 물음표 붙이면 대부분 해결됨
//ex) {boardData?.createDt?.split("T")[0]}
