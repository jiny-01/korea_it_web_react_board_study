import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const profileImgBox = css`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  

  & > img {
    width: 120%;
  }
`;