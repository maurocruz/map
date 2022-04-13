import { createContext, useEffect, useState } from "react";
import { useToken, useUser } from "@hooks/useUser";
import { UserType } from "@hooks/useUser/useUser";

type AppContextType = {
  isAuthenticated: boolean,
  setIsAuthenticated: Function,
  user: UserType,
  setUser: Function,
  token: string,
  setToken: Function
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {

  const { token, setToken } = useToken();
  const { user, setUser, getUser } = useUser();

  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getUser(token);
    }
  },[isAuthenticated]);
  
  return (
    <AppContext.Provider value={{ 
      isAuthenticated,
      setIsAuthenticated,
      user, 
      setUser, 
      token, 
      setToken
    }}>
      {children}
    </AppContext.Provider>
  )
}
