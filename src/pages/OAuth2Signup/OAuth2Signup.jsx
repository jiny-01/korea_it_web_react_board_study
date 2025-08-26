import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import AuthInput from "../../conponents/AuthInput/AuthInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oauth2SignupRequest } from "../../apis/auth/authApis";

//oauth2 회원가입
function OAuth2Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();


  const signupOnClickHandler = () => {
    // 빈 값 체크 - 모든 항목 입력 다되어있는지
    if (
      username.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPassword.trim().length === 0 ||
      email.trim().length === 0
    ) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    // 비밀번호 일치 여부 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    //에러 메시지 있는지 -> 요청 보낼 때 에러 있으면 안되기 때문

    // 여기에 회원가입 API 요청
    console.log("회원가입 요청 보냄");

    //회원가입 요청 Api보내기 (oauth2 유저네임 받아오기)
    oauth2SignupRequest({
      username: username,
      password: password,
      email: email,
      provider: searchParam.get("provider"),
      providerUserId: searchParam.get("providerUserId"),
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          alert(response.data.message);
          navigate("/auth/signin");
        } else if (response.data.status === "failed") {
          alert(response.data.message);
          //요청은 성공 but 아이디/이메일 중복확인에 걸렸을 때
          return;
        }
      })
      .catch((error) => {
        //요청에러가 아닌 서버에러
        alert("문제가 발생했습니다. 다시 시도해주세요.");
        return;
      });
  };

  //비밀번호 정규식 체크 - password, email의 상태가 변경될 때마다 검사
  useEffect(() => {
    //빈 객체를 하나 만듦
    //에러가 없다면 이것 때문에 빈 객체로 초기화됨
    const newErrorMessage = {};

    // 비밀번호 검사
    if (password.length > 0) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
      if (!passwordRegex.test(password)) {
        newErrorMessage.password =
          "비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.";
        console.log("비밀번호 틀림");
      }
    }

    //새로 만들어진 ErrorMessage 의 객체를 set 으로 상태 업데이트해줌
    setErrorMessage(newErrorMessage); // 상태 업데이트
  }, [password]);

  //oauth2 로그인했던 이메일 가져오기
  useEffect(() => {
    console.log("렌더링");
    setEmail(searchParam.get("email"));
  }, [searchParam]);

  
  return (
    <div css={s.container}>
      <h1>회원가입</h1>
      <div css={s.box}>
        <div css={s.inputBox}>
          <AuthInput
            type={"text"}
            placeholder={"아이디"}
            state={username}
            setState={setUsername}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호"}
            state={password}
            setState={setPassword}
          />
          <AuthInput
            type={"password"}
            placeholder={"비밀번호 확인"}
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <AuthInput
            type={"email"}
            placeholder={"이메일"}
            state={email}
            setState={setEmail}
            disabled={true} //입력할 수 없는 상태
          />
        </div>
        <div css={s.errorBox}>
          {/* errorMessage 에 있으면? 뜨게, 없으면 빈 태그 */}
          {Object.keys(errorMessage).length !== 0 ? (
            <ul>
              <li>{errorMessage.password}</li>
              <li>{errorMessage.email}</li>
            </ul>
          ) : (
            <></>
          )}
        </div>

        <div css={s.btnBox}>
          <button css={s.btnBox} onClick={signupOnClickHandler}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default OAuth2Signup;
