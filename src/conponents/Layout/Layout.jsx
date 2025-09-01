import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Header from "../Header/Header";
import { mainContainer } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getPrincipalRequest } from "../../apis/auth/authApis";
import { usePrincipalState } from "../../store/usePrincipalStore";

function Layout({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const { isLoggedIn, principal, login, logout } = usePrincipalState();
  const { data, isLoading } = useQuery({
    queryKey: ["getPrincipal"], //다른 컴포넌트에서 getPrincipal 을 가져다 쓸 수 있음
    queryFn: getPrincipalRequest, //query function
    refetch: 1, //실패 시 다시 시도할 횟수
    enabled: !!accessToken, //토큰 있을떄만 요청보냄
  });

  //usePrincipalState 에서 정의한 상태 변경
  useEffect(() => {
    // console.log(data);    //data 없을 때 undefined
    if (data?.data.status === "success") {
      login(data?.data.data);      //data 가 있으면 data.data 를 넘겨줌
    }
  }, [data, login]);

  // useEffect(() => {
  //   console.log(isLoggedIn, principal);
  // }, [isLoggedIn, principal]);

  return (
    <div css={s.layout}>
      {isLoading ? (
        <>
          <p>로딩중...</p>
        </>
      ) : (
        <>
          <Header />
          <div css={s.mainContainer}>{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
