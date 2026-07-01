import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState([]);
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
  return <AuthContext.provider value={value}>{children}</AuthContext.provider>;
};

export const useAuth = () => useContext(AuthContext);
