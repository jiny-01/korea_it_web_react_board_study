/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { storage } from "../../apis/config/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "@firebase/storage";
import { v4 as uuid } from "uuid";
import { changeProfileImg } from "../../apis/account/accountApis";

function ChangeProfileImg({ oldProfileImg, userId }) {
  const [profileImg, setProfileImg] = useState(null);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  //파이어베이스 사진 업로드 퍼센트
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const onChangeFileHandler = (e) => {
    //업로드한 파일 e 로 받음
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setNewProfileImg(file);

      const reader = new FileReader();
      //파일 읽기가 완료되면 호출될 콜백 함수 정의
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };

      //선택된 파일을 URL 형식으로 읽어옴
      reader.readAsDataURL(file);
    }
  };

  const onClickProfileImgHandler = () => {
    fileInputRef.current.click();
  };

  const onClickChangeBtnHandler = () => {
    if (!newProfileImg) {
      //선택한 이미지 객체
      alert("이미지를 선택하세요.");
      return;
    }

    //업로드 시작
    setIsUploading(true);

    //파이어베이스에 사진 저장할 경로
    const imageRef = ref(
      storage,
      `profile-img/${uuid()}_${newProfileImg.name.split(".").pop()}`
    );

    const uploadTask = uploadBytesResumable(imageRef, newProfileImg);
    //uploadBytes : 성공 유무만 알려줌
    // uploadBytesResumable: 자세하게 상황 알려줌

    //업로드 상태 변화를 감지하는 이벤트 리스너를 등록
    uploadTask.on(
      "state_changed",
      //진행 상태 리스너: 업로드 진행률을 계산할 수 있게 해주는 것
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); //퍼센트로 환산  => 로딩바 라이브러리 사용하면 ui 만들 수 있음
        setProgress(progressPercent);
      },

      //에러 핸들러
      (error) => {
        console.log(error);
        alert("업로드 중 에러가 발생했습니다.");
        setIsUploading(false);
      },

      //완료 핸들러
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          // console.log("url:", downloadUrl);

          //요청 함수 호출(accountApi 에 정의)
          changeProfileImg({ userId: userId, profileImg: downloadUrl }).then(
            (response) => {
              if (response.data.status === "success") {
                alert(response.data.message);
                window.location.reload();
              } else if (response.data.status === "failed") {
                alert(response.data.message);
              }
            }
          );
        } catch (error) {
          console.log(error);
          alert("이미지 URL 을 가져오는 중에 에러가 발생했습니다.");
        } finally {
          setIsUploading(false); //성공하든말든 setIsUploading 상태를 false 로
          setProgress(0);         //업로드 진행 퍼센트 0 초기화
        }
      }
    );
  };

  //====================== 에러 / 완료 핸들러 하기 =================================

  useEffect(() => {
    setProfileImg(oldProfileImg); //이전에 쓰던 거 넣어둠
  }, [oldProfileImg]);

  return (
    <div css={s.container}>
      <div css={s.profileImgBox}>
        <img src={profileImg} alt="profileImage" onClick={onClickProfileImgHandler} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onChangeFileHandler}
        />
      </div>

      <div css={s.buttonBox}>
        <button onClick={onClickChangeBtnHandler}>
          {isUploading ? `{${progress}%}` : "변경하기"}
        </button>
      </div>
    </div>
  );
}

export default ChangeProfileImg;
