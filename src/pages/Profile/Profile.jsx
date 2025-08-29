import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import profileImg from "../../assets/profileimage.jpg";


function Profile() {
  return (
    <div css={s.container}>
      <div css={s.profileContainer}>
        <div css={s.profileHeader}>
            <div css={s.profileImgBox}>
                <div><img src={profileImg} alt="profileImage" /></div>
                
            </div>
            <div css={s.profileInfoBox}>
                <h3>username 자리</h3>
                <div><p>email 자리</p>
                <button>인증하기</button></div>
                
            </div>
        </div>
        <div css={s.profileMain}></div>
      </div>
    </div>
  );
}

export default Profile;
