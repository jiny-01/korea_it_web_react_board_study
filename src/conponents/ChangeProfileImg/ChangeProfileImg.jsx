/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./styles";

function ChangeProfileImg({ oldProfileImg }) {
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    setProfileImg(oldProfileImg); //이전에 쓰던 거 넣어둠
  }, [oldProfileImg]);

  return (
    <div css={s.container}>
      <div css={s.profileImgBox}>
        <img src={profileImg} alt="" />
        <input type="file" accept="image/*" />
      </div>
      
      <div>
        <button></button>
      </div>
    </div>
  );
}

export default ChangeProfileImg;
