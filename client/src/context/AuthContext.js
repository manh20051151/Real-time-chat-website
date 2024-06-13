import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
// JSON.parse(localStorage.getItem("persist:appchat/user"))
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(
      JSON.parse(localStorage.getItem("persist:appchat/user")).current
    ) || null
  );
  console.log(authUser);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
