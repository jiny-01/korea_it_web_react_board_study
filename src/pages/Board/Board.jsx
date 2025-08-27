import React, { useEffect, useState } from "react";

/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApis";
function Board() {
  const [boardList, setBoardList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 마운트 시 최초 요청 한번만
    getBoardList().then((response) => {
      // console.log(response);
      console.log(response.data.data);
      if (response.data.status === "success") {
        setBoardList(response.data.data);
      } else if (response.data.status === "failed") {
        setBoardList([]);
        setMessage(response.data.message); //조회할 게시물 없음 메시지
      }
    });
  }, []);

  return (
    <div css={s.container}>
      <div css={s.listContainer}>
        {/* 게시물 가져온 게 없으면 api 에 failed 에 성정한 메시지 가져옴 */}
        {boardList.length === 0 ? (
          <p>{message}</p>
        ) : (
          <ul>
            {boardList.map((board, index) => {
              const date = board.createDt;
              const formattedDate = date.split("T")[0];
              return (
                <li key={board.boardId}>
                  <div>
                    <span>{index + 1}</span>
                    <strong>{board.title}</strong>
                  </div>
                  <span>{formattedDate}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>{/* <div>페이지네이션</div> */}</div>
    </div>
  );
}

export default Board;
