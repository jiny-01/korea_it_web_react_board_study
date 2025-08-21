import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";

function AuthInput({ type, placeholder, state, setState }) {
  const onChangeHandler = (e) => {
    setState(e.target.value);  //입력값 바뀔때 상태 업데이트
  };
  return (
    <>
      <input
        css={s.input}
        type={type}
        value={state}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default AuthInput;
