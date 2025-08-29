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

export const profileContainer = css`
  width: 100%;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  /* background-color: skyblue; */
`;

export const profileHeader = css`
  width: 100%;
  height: 200px;
  display: flex;
  background-color: yellowgreen;
`;

export const profileMain = css`
  width: 100%;
  height: 500px;
  background-color: salmon;
`;

export const profileImgBox = css`
  width: 200px;
  height: 100%;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #dbdbdb;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 100%;
    }
  }
`;

export const profileInfoBox = css`
  width: calc(100% - 200px);
  height: 100%;
  background-color: burlywood;
  padding: 30px 40px;
  box-sizing: border-box;
  color: #333;

  & > h3 {
    font-size: 24px;
  }

  & > div {
    display: flex;
    gap: 15px;

    & > p {
      margin: 0;
    }

    & > button {
      border: none;
      padding: 3px 5px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 620;
      background-color: #0d63fd;
      color: white;
      cursor: pointer;
    }
  }
`;
