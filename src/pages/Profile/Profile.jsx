import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import profileImg from "../../assets/profileimage.jpg";
import MyBoard from "../../conponents/MyBoard/MyBoard";
import ChangePassword from "../../conponents/ChangePassword/ChangePassword";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { usePrincipalState } from "../../store/usePrincipalStore";
import { sendMailRequest } from "../../apis/account/accountApis";
import ChangeProfileImg from "../../conponents/ChangeProfileImg/ChangeProfileImg";


//훅은 무조건 컴포넌트의 최상단
//useState, useNavigate, useLocation, usePrincipalState 등 (반드시 최상단)

function Profile() {
  const [tab, setTab] = useState("myboard");
  const [tabChild, setTabChild] = useState(1);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, principal } = usePrincipalState();


  //useEffect - 랜더링 후 실행
  useEffect(() => {
    //searchParams.get("tab") : 어느 탭에 있는지 알 수 있음
    // const tabParam = searchParams.get("tab");
    setTab(searchParams.get("tab")); //컴포넌트를 바꿔주는 거지만 탭 바꾸기가 아니므로
    setTabChild(
      searchParams.get("tab") === "myboard" || searchParams.get("tab") === null
        ? 1
        : searchParams.get("tab") === "changepassword"
        ? 2
        : 3
    );
    //myboard 에 있거나 최초 진입 시 1, 아니면 2
  }, [pathname, searchParams]);

  //내 게시물 / 비번 변경 탭 변경 로직
  const tabClickHandler = (path) => {
    setTabChild(path === "myboard" ? 1 : path === "changepassword" ? 2 : 3);
    navigate(`${pathname}?tab=${path}`);
    console.log(tab);
  };

  
  // 이미지 불러올 때 principal이 없을 경우 안전하게 처리
  // if (!principal) {
  //   return <div>로딩 중입니다...</div>;
  // }


  //이메일 인증 로직
  const onClickVerifyHandler = () => {
    sendMailRequest({
      email: principal.email,
    }).then((response) => {
      if (response.data.status === "success") {
        alert(response.data.message);
        window.location.reload();
      } else if (response.data.status === "failed") {
        alert(response.data.message);
      }
    });
  };


  // if (!principal) {
  //   return <div>로딩 중입니다...</div>;
  // }

  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
          <div css={s.profileImgBox}>
            <div>
              <img src={principal?.profileImg} alt="profileImage" />
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
              <li onClick={() => tabClickHandler("changeProfileimg")}>
                프로필 이미지 변경
              </li>
            </ul>
          </div>
          <div css={s.profileMain}>
            {tab === "myboard" || tab === null ? (
              <MyBoard userId={principal?.userId} />
            ) : tab === "changepassword" ? (
              <ChangePassword />
            ) : (
              <ChangeProfileImg oldProfileImg={principal?.profileImg} userId={principal?.userId}/>
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
