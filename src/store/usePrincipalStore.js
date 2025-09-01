import { create } from "zustand";

//============================zustand 로 전역 상태 정의=========================
// isLoggedIn: false, principal: null - 초기 상태
//로그인 함수 : userData 를 가져와서 principal 에 userData 로 셋하는 함수
//로그아웃 함수: 토큰 제거해서 상태 변경 - 로그인(안됨), principal(없음)

  
export const usePrincipalState = create((set, get) => ({
  isLoggedIn: false,
  principal: null,

  login: (userData) => set({ isLoggedIn: true, principal: userData }),

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, principal: null });
    window.location.href = "/auth/signin";
  },
}));

/**
 * 전역 상태관리 - zustand 라이브러리 사용 
 * npm i zustand 해서 설치
 * 
 * <전역 상태관리를 사용하는 이유
 * 1. 컴포넌트 간의 상태 공유
 * 2. Props Drilling 방지 
 * -코드 복잡성 증가
 * -유지보수 어려움
 * -불필요한 렌더링 유발
 * 3. 관심사 분리 (필요한 것만 쓰기 위함)
 * 4. 상태 예측 가능성 - 현재 상태 알아차리기 위함
 */