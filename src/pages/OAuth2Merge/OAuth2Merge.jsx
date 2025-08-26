import React from "react";
import { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AuthInput from "../../conponents/AuthInput/AuthInput";
import { oauth2MergeRequest } from "../../apis/auth/authApis";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth2Merge() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();

  const mergeOnClickHandler = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.");
      return;
    } else {
      //연동 로그인 API 요청 보내기
      //로그인 성공했을 때 accessToken 가져오기
      oauth2MergeRequest({
        //상태에 입력한 username, password 보내는 것
        username: username,
        password: password,
        provider: searchParam.get("provider"),
        providerUserId: searchParam.get("providerUserId"),
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === "success") {
            alert(response.data.message);
            //바로 로그인페이지로
            navigate("/auth/signin");
            //서버 sign in ApiRespDto 에 있는 data 안에 accessToken 가져오기
            const accessToken = response.data.data;
            localStorage.setItem("accessToken", accessToken); //토큰 로컬스토리지에 저장?
            // navigate("/");       //로그인 성공하면 HOME 페이지로 이동 (컴포넌트 교체)
            window.location.href = "/";
            //컴포넌트만 바꾸는 것이 아닌 새로고침하면서 새 페이지로
          } else if (response.data.status === "failed") {
            alert(response.data.message);
            //요청은 성공 but 아이디, 비번 일치하지 않을 때
            return;
          }
        })
        .catch((error) => {
          //요청에러가 아닌 서버에러
          alert("문제가 발생했습니다.");
          return;
        });
    }
  };

  return (
    <div css={s.container}>
      <h1>로그인</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type={"text"}
            placeholder={"아이디"}
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호"}
            state={password}
            setState={setPassword}
          />
        </div>
        <div css={s.btnBox}>
          <button css={s.btnBox} onClick={mergeOnClickHandler}>
            연동하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Merge;
