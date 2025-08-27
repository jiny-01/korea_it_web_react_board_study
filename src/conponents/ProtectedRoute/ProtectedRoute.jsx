import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    //children => write 컴포넌트
  
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData(["getPrincipal"]);

  if (principalData === undefined) {
    alert("로그인이 필요합니다.");
    window.location.href="/auth/signin";     //홈으로 이동
    return;
  }
  return children;   //children 인 write 컴포넌트 보여줌
}

export default ProtectedRoute;
