import { css } from "@emotion/react";


export const container = css`
display: flex;
flex-direction: column;
align-items: center;

width: 100%;
padding: 40px 200px;
box-sizing: border-box;
background-color: aliceblue;

& > input {
    border: 1px solid #dbdbdb;
    background-color: transparent;
    padding: 15px;
    outline: none;
    border-radius: 15px;
    width: 100%;
}
`