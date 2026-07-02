import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(
     JSON.parse(sessionStorage.getItem("UserData")) || "",
  );
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // if (user) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false);
    // }
    setIsLogin(!!user);
  }, [user]);

  const value = {
    user,
    setuser,
    isLogin,
    setIsLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
