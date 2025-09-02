import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  overflow: auto;

  & > ul > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 20px;
    box-sizing: border-box;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    

    &:hover {
      opacity: 0.8;
      background-color: #f2f2f2;
    }

    & > div {
      display: flex;
      gap: 20px;
    }
  }
`;