import { createContext } from "react";

type AppContextType = {
}

export const  AppContext = createContext({} as AppContextType);

export function AppProvider({ children }) {

    return (
        <AppContext.Provider value={{}}>
            { children }
        </AppContext.Provider>
    )
}