import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
function OAuth2() {
  const navigate = useNavigate();

  return (
    <div css={s.container}>
      <div
        css={s.card}
        onClick={() => {
          navigate("/oauth2/signup");
        }}
      >
        <h3>새로 가입하기</h3>
        <p>
          아직 계정이 없다면, 지금 사용하는 소셜 계정으로 새 계정을 만들 수
          있습니다
        </p>
      </div>
      <div css={s.card}>
        <h3>연동하기</h3>
        <p>
          {`기존 계정이 있다면, 해당 계정과 지금의\n소셜 계정을 연동할 수 있습니다.`}
        </p>
      </div>
    </div>
  );
}

export default OAuth2;
