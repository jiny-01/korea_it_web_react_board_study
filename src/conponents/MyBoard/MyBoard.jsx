/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { getBoardList } from "../../apis/board/boardApis";
import * as s from "./styles";
import React, { useEffect, useState } from "react";

function MyBoard({ userId }) {
  const [boardList, setBoardList] = useState([]);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 마운트 시 최초 요청 한번만
    getBoardList().then((response) => {
      // console.log(response);
      console.log(response.data.data);
      if (response.data.status === "success") {
        setBoardList(
          response.data.data.filter((board) => board.userId === userId)
        );
        //게시물의 유저 Id = userId (props 로 받아온) 같은 것만 필터
      } else if (response.data.status === "failed") {
        setBoardList([]);
        setMessage(response.data.message); //조회할 게시물 없음 메시지
      }
    });
  }, [userId]);
  return (
    <div css={s.container}>
      <ul>
        {boardList.map((board, index) => {
          const date = board.createDt;
          // const boardNumber = currentPage * amountBoard + index + 1;
          const formattedDate = date.split("T")[0];

          return (
            <li
              key={board.boardId}
              onClick={() => navigate(`board/${board.boardId}`)}
            >
              <div>
                <span>{index + 1}.</span>
                <strong>{board.title}</strong>
              </div>
              <span>{formattedDate}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyBoard;
