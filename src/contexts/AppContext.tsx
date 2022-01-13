import { createContext } from "react";
import useUser, { UserType } from "@hooks/useUser/useUser";

type AppContextType = {
    isAuthenticated: boolean,
    user: UserType,
    setUser: (user: UserType) => void
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {

   const { isAuthenticated, user, setUser } = useUser();

    return (
        <AppContext.Provider value={{ isAuthenticated, user, setUser }}>
            { children }
        </AppContext.Provider>
    )
}