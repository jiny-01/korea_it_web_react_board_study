/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React from 'react'

function MyBoard() {
  return (
    <div css={s.container}>
      <ul>
        <li>
          <div>
            <span>1.</span>
            <strong>제목이 들어갈 자리</strong>
          </div>
          <span>2025-09-01</span>
        </li>
      </ul>
    </div>
  );
}

export default MyBoard
