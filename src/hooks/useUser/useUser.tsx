import { useEffect, useState } from 'react'
import { useApi } from '@hooks/useApi';
import jwtDecode from 'jwt-decode';
import useToken from './useToken';

type TokenType = {
  iss: string,
  exp: number,
  name: string,
  admin: boolean,
  uid: string
}

export type UserType = {
  name: string,
  status: string,
  uid: string,
  email?: string
}

export default function useUser() 
{
  const { token } = useToken();

  const { responseApi, setRequestApi } = useApi();

  const [ user, setUser ] = useState<UserType>();

  useEffect(() => {
    if(token) {
      const tokenDecoded = jwtDecode<TokenType>(token);      
      setRequestApi({
        path: 'user',
        method: 'GET',
        token: token,
        values: {
          iduser: tokenDecoded.uid
        }
      })
    }

    return () => {
      return null;
    }
  },[token])

  useEffect(() => {    
    if (responseApi && responseApi.length == 1) {
      const response = responseApi[0];      
      setUser({
        name: response.name,
        status: response.status,
        uid: response.iduser,
        email: response.email
      });
    }

    return () => {
      return null;
    }
    
  }, [responseApi])

  function getUser(token: string) {
    if (token) {
      const tokenDecoded = jwtDecode<TokenType>(token);      
      setRequestApi({
        path: 'user',
        method: 'GET',
        token: token,
        values: {
          iduser: tokenDecoded.uid
        }
      })
    }
  }

  return {
    user,
    setUser,
    getUser
  }
}
