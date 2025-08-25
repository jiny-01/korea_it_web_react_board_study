import { css } from "@emotion/react"


export const container = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px;
`;

export const box = css`
	width: 360px;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const inputBox = css`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const signinBtnBox = css`
	display: flex;
	gap: 10px;

	& > a {
        box-sizing: border-box;
		flex: 1;
		padding: 12px 0;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
        background-color: #dee2e6; /* 연회색 */
        color: black;
        border: none;
	}

	& > button:hover {
		opacity: 0.9;
	}
`;

export const oauthBtnBox = css`
	display: flex;
	flex-direction: column;
	gap: 10px;

	& > button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px; /* 아이콘-텍스트 간격 */
		width: 100%;
		padding: 12px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background-color: #fff;
		font-size: 14px;
		font-weight: 500;
		color: #333;
		cursor: pointer;

		/* ✅ background → background-color 로 변경 */
		transition: background-color 0.2s ease, color 0.2s ease;

		&:hover {
			background-color: #f8f9fa;
			color: #000;
		}
	}
`;