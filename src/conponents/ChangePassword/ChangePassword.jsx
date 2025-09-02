import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AuthInput from "../AuthInput/AuthInput";
import { useMutation } from "@tanstack/react-query";
import { changePasswordRequest } from "../../apis/account/accountApis";
import { useNavigate } from "react-router-dom";
import { usePrincipalState } from "../../store/usePrincipalStore";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, principal, logout } = usePrincipalState();
  //헤더에서 가져옴(전역상태에서 정의한 logout 사용하기 위함)

  const changePasswordMutation = useMutation({
    mutationKey: "changePassword",
    mutationFn: changePasswordRequest,
    onSuccess: (response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        logout(); //비번 바뀌었으니 로그아웃하고 다시 로그인페이지로
        navigate("/auth/signin");
      } else if (response.data.status === "failed") {
        //요청 자체가 실패- 다양한 이유(백엔드)
        alert(response.data.message);
        setPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        return;
      }
    },
  });

  const onClickChangeHandler = () => {
    //1. 모든 항목 입력되어있는지 
    if (
      password.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      newPasswordConfirm.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }
    //2. 비밀번호 조건에 맞는지
    if (errorMessage !== "") {
      alert(
        "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
      );
      return;
    }
    //3. 새 비번과 재입력 비번이 일치하는지
    if (newPassword !== newPasswordConfirm) {
      alert("재입력한 비밀번호가 일치하지 않습니다.");
      return;
    }
    changePasswordMutation.mutate({
      userId: principal.userId,
      oldPassword: password,
      newPassword: newPassword,
    });
  };

  //비밀번호 정규식 체크 - password, email의 상태가 변경될 때마다 검사
  useEffect(() => {
    // //빈 객체를 하나 만듦
    // //에러가 없다면 이것 때문에 빈 객체로 초기화됨
    // const newErrorMessage = {};

    setErrorMessage(""); //에러메시지 초기화
    // 비밀번호 검사
    if (newPassword.length > 0) {
      // 한 글자라도 입력한 순간 검사 수행
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(newPassword)) {
        setErrorMessage(
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다."
        );
        console.log("비밀번호 변경");
      }
    }
  }, [newPassword]);

  return (
    <div css={s.container}>
      <div css={s.inputBox}>
        <AuthInput
          type={"password"}
          placeholder={"현재 비밀번호"}
          state={password}
          setState={setPassword}
        />
        <AuthInput
          type={"password"}
          placeholder={"새 비밀번호"}
          state={newPassword}
          setState={setNewPassword}
        />
        <AuthInput
          type={"password"}
          placeholder={"새 비밀번호 확인"}
          state={newPasswordConfirm}
          setState={setNewPasswordConfirm}
        />
        <ul>{errorMessage !== "" ? <li>{errorMessage}</li> : <></>}</ul>
        <button onClick={onClickChangeHandler}>변경하기</button>
      </div>
    </div>
  );
}

export default ChangePassword;
