import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// 가장 상위 컴포넌트
function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
