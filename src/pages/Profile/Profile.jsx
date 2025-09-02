import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import profileImg from "../../assets/profileimage.jpg";
import MyBoard from "../../conponents/MyBoard/MyBoard";
import ChangePassword from "../../conponents/ChangePassword/ChangePassword";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { usePrincipalState } from "../../store/usePrincipalStore";
import { sendMailRequest } from "../../apis/account/accountApis";

function Profile() {
  const [tab, setTab] = useState("myboard");
  const [tabChild, setTabChild] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, principal } = usePrincipalState();

  //내 게시물 / 비번 변경 탭 변경 로직
  const tabClickHandler = (path) => {
    setTabChild(path === "myboard" ? 1 : 2);
    navigate(`${pathname}?tab=${path}`);
    console.log(tab);
  };

  //이메일 인증 로직
  const onClickVerifyHandler = () => {
    sendMailRequest({
      email: principal.email,
    }).then((response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
      } else if (response.data.status === "failed") {
        alert(response.data.message);
      }
    });
  };

  useEffect(() => {
    //searchParams.get("tab") : 어느 탭에 있는지 알 수 있음
    setTab(searchParams.get("tab")); //컴포넌트를 바꿔주는 거지만 탭 바꾸기가 아니므로
    setTabChild(
      searchParams.get("tab") === "myboard" || searchParams.get("tab") === null
        ? 1
        : 2
    );
    //myboard 에 있거나 최초 진입 시 1, 아니면 2
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
              {principal?.authorities[0].authority === "ROLE_TEMPORARY" ? (
                <button onClick={onClickVerifyHandler}>인증하기</button>
              ) : (
                <></>
              )}
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
              <MyBoard userId={principal?.userId} />
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
