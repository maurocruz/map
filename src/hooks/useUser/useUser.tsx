import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';

export type UserType = {
    name: string
}

export default function useUser() 
{
    const [ user, setUser ] = useState<UserType | null>(null);

    const [ token, setToken ] = useState<String | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'plinctmap.token': token } = parseCookies();
        
        if (token) {
            const tokenDecode = jwtDecode<UserType>(token)
            setUser({
                name: tokenDecode.name
            })
        } else {
            setUser(null);
        }

    }, [token])


    return {
        isAuthenticated,
        user, 
        setToken
    }
}