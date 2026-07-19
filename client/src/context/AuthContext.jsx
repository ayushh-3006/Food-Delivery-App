import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
     JSON.parse(sessionStorage.getItem("cravingUser")) || JSON.parse(sessionStorage.getItem("UserData")) || "",
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user?.userType || "");

  useEffect(() => {
    setIsLogin(!!user);
    if (user) {
      setRole(user.userType || "");
    } else {
      setRole("");
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    role,
    setRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
