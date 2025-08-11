import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

const USERNMAE = "username";
const TOKEN = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNMAE)
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN)
  );

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNMAE, username);
    localStorage.setItem(TOKEN, token);
  };
  const logout = () => {
    localStorage.removeItem(USERNMAE);
    localStorage.removeItem(TOKEN);
    setUsername(null);
    setToken(null);
  };

  const isAuth = !!token;
  return (
    <AuthContext.Provider value={{ username, token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
