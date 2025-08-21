import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { LuLogIn, LuUserRoundPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

//   const onClickLogoHandler = () => {
//     navigate("/");
//   };

  const onClickNavHandler = (path) => {
    navigate(path);
  }
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
        <ul>
            {/* 로그인 버튼 & 회원가입 버튼 */}
          <li css={s.headerIcon} onClick={() => onClickNavHandler("/auth/signin")}>
            <LuLogIn />
          </li>
          <li css={s.headerIcon} onClick={() => onClickNavHandler("/auth/signup")}>
            <LuUserRoundPlus />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
