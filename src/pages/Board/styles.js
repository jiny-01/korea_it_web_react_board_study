import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 40px 200px;
  box-sizing: border-box;
  /* background-color: aliceblue; */
`;

export const listContainer = css`
  width: 100%;
  height: 750px;
  /* padding: 20px; */
  box-sizing: border-box;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  box-sizing: border-box;
  /* background-color: aliceblue; */


  & > ul > li {
    justify-content: space-between;
    display: flex;
    width: 100%;
    height: 50px;
    /* background-color: aqua; */
    border-bottom: 1px solid #dbdbdb;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    color: #333;
  }


  & > div {
    display: flex;
    gap: 20px;
  }
`;
