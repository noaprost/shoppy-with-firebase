import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  // 로그인한 사용자가 있는지 확인
  // 그 사용자가 어드민 권한이 있는지 확인
  // requireAdmin이 true인 경우에는 로그인도 되어있어야 하고, 어드민 권한도 가지고 있어야 함
  // 조건에 맞지 않으면 / 상위 경로로 이동!
  // 조건에 맞는 경우에만 전달된 children을 보여줌
  const { user } = useAuthContext();
  if (user == undefined) {
    return <></>;
  }
  // user가 없거나(로그인이 안되어 있거나), admin이 필요한데 user에 admin이 없다면 지정된 페이지로 만들 수 없음
  else if (!user || (requireAdmin && !user.isAdmin)) {
    // 잘못들어온 경로이므로 히스토리에 남기고 싶지 않다면 replace를 true로 설정
    return <Navigate to="/" replace />;
  } else return children;
}
