import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoginPage, setIsLoginPage] = useState(null);
  console.log(isLoginPage);
  return (
    <AuthContext.Provider value={{ isLoginPage, setIsLoginPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
