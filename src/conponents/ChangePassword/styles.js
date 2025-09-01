import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const inputBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > button {
    border: none;
    padding: 10px 15px;
    background-color: #0d6efd;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
      opacity
    }
  }
`;
