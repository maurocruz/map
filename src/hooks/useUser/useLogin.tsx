import { useContext, useEffect } from "react";
import { useApi } from "@hooks/useApi";
import { AppContext } from "@contexts/AppContext";
import { setCookie } from "nookies";

/**
 * LOGIN FUNCTION
 * 
 * @returns 
 */
export default function useLogin() 
{
  const { setToken, setIsAuthenticated } = useContext(AppContext);

  const { responseApi, setRequestApi } = useApi();  
  
  // CREATE COOKIE
  useEffect(() => {  
    if (responseApi && responseApi.status == "success" && responseApi.token) {      
      setCookie(undefined, 'plinctmap.token', responseApi.token, {
        maxAge: 60 * 60 * 24, // 1 dia
        sameSite: 'lax'
      })
      setToken(responseApi.token);
      setIsAuthenticated(true);
    }
  },[responseApi])
  
  /**
   * 
   * @param email 
   * @param password 
   */
  function login(email: string, password: string) {
    setRequestApi({
      path: 'auth/login',
      method: 'POST',
      values: {
        email: email,
        password: password
      }
    })
  }

  return {
    responseApi,
    login
  }
}
