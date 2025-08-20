import { css } from "@emotion/react";

export const header = css`
  height: 60px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    
    & > ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      & > li {
        cursor: pointer;
        color: #333;

        & > a {
         text-decoration: none;
         color: #333;
        }
        
      }
      
    }
  }
`;

export const headerIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  border-radius: 50%;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  width: 35px;
  height: 35px;
  color: #333;
  cursor: pointer;
`;
