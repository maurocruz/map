
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export default function useToken() {

  const { 'plinctmap.token': tokenCookie } = parseCookies();
  
  const [ token, setToken ] = useState(tokenCookie);

  useEffect(() => {
    if (token && token !== 'undefined') {
      setToken(token);
    } else {
      setToken(undefined);
    }   

  },[token])
        
  return {
    token,
    setToken    
  }
}
