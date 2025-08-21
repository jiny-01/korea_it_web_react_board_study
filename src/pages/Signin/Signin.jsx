import React, { useState } from "react";

/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AuthInput from "../../conponents/AuthInput/AuthInput";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


function Signin() {

  const navigate = useNavigate();
  //로그인 페이지에서 회원가입 누르면 -> 회원가입 페이지로 이동
  const signupOnClickHandler = () => {
    navigate("/auth/signup");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  const signinOnClickHandler = () => {
    console.log(username, password);
    if(username.trim().length === 0 || password.trim().length === 0) {
      alert("아이디 또는 비밀번호를 입력해주세요.")
      return;
    } else {
      //로그인 API 요청 보내기
    }
    
  }

  return (
    <div css={s.container}>
      <h1>로그인</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput type={"text"} placeholder={"아이디"} state={username} setState={setUsername}/>
          <AuthInput type={"password"} placeholder={"비밀번호"} state={password} setState={setPassword}/>
        </div>
        <div css={s.signinBtnBox}>
          <button
            style={{ backgroundColor: "#6c757d" }}
            onClick={signupOnClickHandler}
          >
            회원가입
          </button>
          <button style={{ backgroundColor: "#0d6efd" }} onClick={signinOnClickHandler}>로그인</button>
        </div>
        <div css={s.oauthBtnBox}>
          <button className="google">
            <FcGoogle size={20} />
            <span>구글로 로그인</span>
          </button>
          <button className="naver">
            <SiNaver size={18} color="#03C75A" />
            <span>네이버로 로그인</span>
          </button>
          <button className="kakao">
            <RiKakaoTalkFill size={20} color="#FEE500" />
            <span>카카오로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
