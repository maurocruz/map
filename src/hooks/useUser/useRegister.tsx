import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";
import useLogin from "./useLogin";

/**
 * REGISTER FUNCTION
 * 
 * @returns 
 */
export default function useRegister() 
{
  const { setRequestApi, responseApi } = useApi();
  const { login } = useLogin();

  const [ email, setEmail ] = useState(String);
  const [ password, setPassword ] = useState(String);

  useEffect(() => {
    if (responseApi && responseApi.status == "success") {
      login(email, password);
    }
  },[responseApi])

  /**
   * 
   * @param email 
   * @param name 
   * @param password 
   * @param repeatPassword 
   */
  function requestApi (email: string, name: string, password: string, repeatPassword: string) {
    setEmail(email);
    setPassword(password);
    setRequestApi({
      path: 'auth/register',
      method: 'POST',
      values: {
        email: email,
        name: name,
        password: password,
        repeatPassword: repeatPassword
      }
    })
  }

  return {
    requestApi,
    responseApi
  }
}
