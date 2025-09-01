import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { LuLogIn, LuLogOut, LuUserRoundPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
//  - 캐시메모리를 전역상태로 쓰고 있었음  => 이후 전역상태 만들었으므로 불필요
import { IoMdPerson } from "react-icons/io";
import { usePrincipalState } from "../../store/usePrincipalStore";

function Header() {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const principalData = queryClient.getQueryData(["getPrincipal"]);
  // 이거 대신
  const {isLoggedIn, principal, logout} = usePrincipalState();

  //   const onClickLogoHandler = () => {
  //     navigate("/");
  //   };

  const onClickNavHandler = (path) => {
    navigate(path);
  };

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");   //토큰 지움
    window.location.href = "/auth/signin";    //로그인페이지로 보냄
  };

  // console.log(principalData);

  
  return (
    <div css={s.header}>
      <div onClick={() => onClickNavHandler("/")}>BOARD</div>
      <div>
        <ul>
          <li>
            <Link to={"/board"}>게시판</Link>
          </li>
          <li>
            <Link to={"/write"}>글쓰기</Link>
          </li>
        </ul>
      </div>
      <div>
        {isLoggedIn ? (
          <ul>
            <li css={s.headerIcon} onClick={() => onClickNavHandler(`/account/profile/${principal.username}`)}>
              <IoMdPerson />
            </li>
            <li css={s.headerIcon} onClick={onClickLogout}>
              <LuLogOut />
            </li>
          </ul>
        ) : (
          <ul>
            {/* 로그인 버튼 & 회원가입 버튼 */}
            <li
              css={s.headerIcon}
              onClick={() => onClickNavHandler("/auth/signin")}
            >
              <LuLogIn />
            </li>
            <li
              css={s.headerIcon}
              onClick={() => onClickNavHandler("/auth/signup")}
            >
              <LuUserRoundPlus />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;
