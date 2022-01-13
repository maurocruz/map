import { createContext } from "react";

type AppContextType = {
    isAuthenticated: boolean
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {
    const isAuthenticated = false

    return (
        <AppContext.Provider value={{ isAuthenticated }}>
            { children }
        </AppContext.Provider>
    )
}