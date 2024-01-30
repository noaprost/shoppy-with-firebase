import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { login, logout, onUserStateChange } from "../api/firebase";
import Button from "./ui/Button";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // aplication 실행 시 사용자의 세션이 남아있거나 로그인을 했다면 정상적인 user 객체가 전달됨
    // 로그아웃을 했다면 null이 전달됨
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogout = () => {
    logout().then(setUser);
  };

  return (
    <>
      <div className="flex flex-row px-32 py-5 justify-between">
        <Link
          to="/"
          className="flex flex-row items-center w-32 justify-evenly text-3xl text-orange-400 hover:text-orange-500 font-semibold"
        >
          <FiShoppingBag className="text-orange-400 w-7 h-7 hover:text-orange-500" />
          Shoppy
        </Link>
        <div className="flex flex-row items-center w-80 justify-evenly text-center">
          <Link to="/products" className="w-16 mt-1 h-7 text-center">
            products
          </Link>
          {user && (
            <Link to="/carts">
              <FiShoppingCart className="w-7 h-7 p-1" />
            </Link>
          )}
          {user && user.isAdmin && (
            <Link to="/products/new">
              <GoPencil className="w-7 h-7 p-1" />
            </Link>
          )}
          {user && (
            <>
              <div className="bg-purple-100 rounded-xl text-center text-black font-semibold w-7 h-7">
                {user.displayName[0]}
              </div>
              <p className="hidden md:block">{user.displayName}</p>
            </>
          )}

          {user ? (
            <Button text="Logout" onClick={handleLogout}></Button>
          ) : (
            <Button text="Login" onClick={handleLogin}></Button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
