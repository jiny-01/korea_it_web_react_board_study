import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

//oauth2 로그인
function OAuth2Signin() {
  const [searchParam] = useSearchParams();

  useEffect(() => {
    localStorage.setItem("accessToken", searchParam.get("accessToken"));
    window.location.href = "/";
  }, [searchParam]);
  return <div>OAuth2 로그인</div>;
}

export default OAuth2Signin;
