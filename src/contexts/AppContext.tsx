import { createContext, useEffect, useState } from "react";
import { UserType } from "@hooks/useUser/useUser";
import { destroyCookie, parseCookies } from "nookies";
import jwtDecode from "jwt-decode";

type AppContextType = {
  isAuthenticated: boolean,
  setIsAuthenticated: Function,
  user: UserType,
  setUser: Function,
  apiHost: string,
  setToken: Function
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {

  const apiHost = "https://plinct.local/api/";

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  const [ user, setUser ] = useState<UserType | null>(null);

  const [ token, setToken ] = useState(null);


  useEffect(() => {
    const { 'plinctmap.token': token } = parseCookies();
//console.log(token);
    if (token && token !== 'undefined') {
      const tokenDecoded = jwtDecode<UserType>(token)
      //console.log(tokenDecoded)
      setUser({ name: tokenDecoded.name })
      setIsAuthenticated(true);
      setToken(token);
    } else {
      setUser(null)
      setIsAuthenticated(false);
      destroyCookie(undefined, 'plinctmap.token');        
    }
  },[token])

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, apiHost, setToken }}>
      { children }
    </AppContext.Provider>
  )
}
