import { createContext } from "react";
import useUser, { UserType } from "@hooks/useUser/useUser";

type AppContextType = {
    isAuthenticated: boolean,
    user: UserType,
    setToken: any,
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {

   const { isAuthenticated, user, setToken } = useUser();

    return (
        <AppContext.Provider value={{ isAuthenticated, user, setToken }}>
            { children }
        </AppContext.Provider>
    )
}