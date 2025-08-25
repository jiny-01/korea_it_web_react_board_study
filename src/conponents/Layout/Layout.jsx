import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Header from "../Header/Header";
import { mainContainer } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getPrincipalRequest } from "../../apis/auth/authApis";
function Layout({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const { data, isLoading } = useQuery({
    queryKey: ["getPrincipal"], //다른 컴포넌트에서 getPrincipal 을 가져다 쓸 수 있음
    queryFn: getPrincipalRequest, //query function
    refetch: 1, //실패 시 다시 시도할 횟수
    enabled: !!accessToken, //토큰 있을떄만 요청보냄
  });

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
