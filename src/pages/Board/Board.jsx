import React, { useEffect, useState } from "react";

/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { getBoardList } from "../../apis/board/boardApis";
import ReactPaginate from "react-paginate";
function Board() {
  const [boardList, setBoardList] = useState([]);
  const [message, setMessage] = useState("");
  const [currentBoardList, setCurrentBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const amountBoard = 15; //한 페이지당 보여줄 게시물 갯수

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

  useEffect(() => {
    const offset = currentPage * amountBoard;
    const slicedBoard = boardList.slice(offset, offset + amountBoard); //15개씩 잘라냄
    console.log(slicedBoard);
    setCurrentBoardList(slicedBoard);
  }, [currentPage, boardList]);

  const pageOnChangeHandler = (event) => {
    setCurrentPage(event.selected);
  };
  return (
    <div css={s.container}>
      <div css={s.listContainer}>
        {/* 게시물 가져온 게 없으면 api 에 failed 에 성정한 메시지 가져옴 */}
        {boardList.length === 0 ? (
          <p>{message}</p>
        ) : (
          <ul>
            {currentBoardList.map((board, index) => {
              const date = board.createDt;
              const boardNumber = currentPage * amountBoard + index + 1;
              const formattedDate = date.split("T")[0];
              return (
                <li key={board.boardId}>
                  <div>
                    <span>{boardNumber}</span>
                    <strong>{board.title}</strong>
                  </div>
                  <span>{formattedDate}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div css={s.paginateContainer}>
        <ReactPaginate
          pageCount={Math.ceil(boardList.length / amountBoard)}
          onPageChange={pageOnChangeHandler}
          previousLabel="◁ 이전"
          nextLabel="다음 ▷"
        />
      </div>
    </div>
  );
}

export default Board;

//지금은 프론트에서 처리하지만 페이지 넘길 때마다 전체 조회하기 때문에 - 리소스 과부하
//페이지네이션할 때 백엔드에서 계산해서 넣을 수 있는 api 를 사용해야함
