import { useContext, useEffect } from 'react'
import { destroyCookie, setCookie } from 'nookies';
import { useApi } from '@hooks/useApi';
import { AppContext } from '@contexts/AppContext';

export type UserType = {
    name: string
}

export default function useUser() 
{
  const { setIsAuthenticated, setUser, setToken } = useContext(AppContext);

  const { responseApi, setRequest } = useApi();  

  useEffect(() => {
    if (responseApi && responseApi.status == "success" && responseApi.token) {
      setCookie(undefined, 'plinctmap.token', responseApi.token, {
        maxAge: 60 * 60 * 1
      })
      setToken(responseApi.token);
    }

    return () => {}
    
  }, [responseApi])

  function login (email: string, password: string) {
    setRequest({
      method: 'post',
      type: 'auth/login',
      values: {
        email: email,
        password: password
      }
    })
  }

  function register (email: string, name: string, password: string, repeatPassword: string) {
    setRequest({
      method: 'post',
      type: 'auth/register',
      values: {
        email: email,
        name: name,
        password: password,
        repeatPassword: repeatPassword
      }
    })
  }

  function logout() {
    setIsAuthenticated(null);
    setUser(null);
    destroyCookie(undefined, 'plinctmap.token');        
  }

  return {
    login,
    logout,
    register,
    responseApi
  }
}
