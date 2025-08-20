import { css } from "@emotion/react";

export const layout = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: beige;
  align-items: center;
`;

export const mainContainer = css`
  width: 60%;
  height: calc(100vh - 60px);
  /* 전체 화면 100vh - header 높이 */
  min-height: 800px;
  border-right: 1px solid #dbdbdb;
  border-left: 1px solid #dbdbdb;
  box-sizing: border-box;
  /* background-color: skyblue; */
`;
