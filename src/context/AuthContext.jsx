import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // aplication 실행 시 사용자의 세션이 남아있거나 로그인을 했다면 정상적인 user 객체가 전달됨
    // 로그아웃을 했다면 null이 전달됨
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  return (
    // 로그인과 로그아웃은 firebase에서 정의한 함수를 그대로 사용할 수 있도록 해줌
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
