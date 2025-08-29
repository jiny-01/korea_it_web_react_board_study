import { css } from "@emotion/react";

export const container = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: 40px 200px;
	box-sizing: border-box;
	gap: 15px;

	& > input {
		border: 1px solid #dbdbdb;
		background-color: transparent;
		border-radius: 15px;
		padding: 15px 20px;
		box-sizing: border-box;
		width: 100%;
		outline: none;
		font-size: 20px;
		color: #333;
	}

	& > textarea {
		width: 100%;
		min-height: 500px;
		padding: 15px 20px;
		border: 1px solid #dbdbdb;
		border-radius: 15px;
		box-sizing: border-box;
		outline: none;
		font-size: 18px;
		font-weight: 600;
		color: #333;
		resize: none;
	}
`;

export const btnBox = css`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;

	& > button {
		background-color: #0d6efd;
		padding: 12px 25px;
		border: none;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		color: white;
		transition: all 0.2s ease;
	}

	& > button:hover {
		opacity: 0.9;
	}
`;