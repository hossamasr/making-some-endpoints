import type { FC, PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";



const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [username, setUsername] = useState<string | null>(localStorage.getItem('username')
  )

  const [token, setToken] = useState<string | null>(localStorage.getItem('token')
  )
  useEffect(() => {
    setUsername(username)
    setToken(token)


  }, [])
  const login = (username: string, token: string) => {
    setUsername(username)
    setToken(token)
    localStorage.setItem('username', username)
    localStorage.setItem('token', token)



  }
  return (<AuthContext.Provider value={{ username, token, login }}>{children}</AuthContext.Provider>





  )


}
export default AuthProvider
