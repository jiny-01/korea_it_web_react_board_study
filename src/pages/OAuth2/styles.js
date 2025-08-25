import { css } from "@emotion/react";

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200px;
  gap: 50px;
`;

export const card = css`
 min-width: 300px;       /* 최소 너비 지정 */
  width: 700px;       /* 최대 너비 제한*/
  height: auto;
  /* width: 700px; 
  height: 120px; */
  border: 1px solid #dbdbdb;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  /* flex-direction: row; */
  padding: 30px;
  cursor: pointer;
  background-color: #fff;
  transition: all 0.2s ease;

  & > h3 {
    margin: 0;
    padding: 0 10px;
    font-size: 28px;
    color: #333;
    width: 150px;
  white-space: nowrap;
  text-align: center;
  }

  & > p {
    margin: 0;
    padding: 10px 0;
    word-break: keep-all;
    width: 100%;
    font-size: 14px;
    text-align: center;
    white-space: pre-line;
    
  }

  &:hover{
    background-color: #f8f9fa;
  }
`;
