import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import profileImg from "../../assets/profileimage.jpg";
import MyBoard from "../../conponents/MyBoard/MyBoard";
import ChangePassword from "../../conponents/ChangePassword/ChangePassword";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { usePrincipalState } from "../../store/usePrincipalStore";

function Profile() {
  const [tab, setTab] = useState("myboard");
  const [tabChild, setTabChild] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const {isLoggedIn, principal} = usePrincipalState();

  const tabClickHandler = (path) => {
    setTabChild(path === "myboard" ? 1 : 2);
    navigate(`${pathname}?tab=${path}`);
    console.log(tab);
  };

  useEffect(() => {
    setTab(searchParams.get("tab"));
  }, [pathname, searchParams]);

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={profileImg} alt="profileImage" />
            </div>
          </div>
          <div css={s.profileInfoBox}>
            <h3>{principal?.username}</h3>
            <div>
              <p>{principal?.email}</p>
              {principal?.authorities[0].authority === "ROLE_TEMPORARY" ? (<button>인증하기</button>): (<></>)}
            </div>
          </div>
        </div>
        <div css={s.profileBox}>
          <div css={s.profileTab(tabChild)}>
            <ul>
              <li onClick={() => tabClickHandler("myboard")}>내 게시물</li>
              <li onClick={() => tabClickHandler("changepassword")}>
                비밀번호 변경
              </li>
            </ul>
          </div>
          <div css={s.profileMain}>
            {tab === "myboard" || tab === null ? (
              <MyBoard />
            ) : (
              <ChangePassword />
            )}
            {/* <MyBoard /> */}
            {/* <ChangePassword /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
