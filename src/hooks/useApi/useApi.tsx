import { useEffect, useState } from "react";
import axios, { Method } from 'axios'
import { PATH } from '../../../plinct.config';


type RequestApi = {
    method: Method,
    path: string,
    values: {},
    token?: string | null
}

type ResponseApi = {
    status: string,
    message: string,
    token: string,
    data: [],
    payload: {}
}

/**
 * API REQUEST FUNCTION
 * 
 * @returns 
 */
export default function useApi() {

  const apiHost = PATH.apiHost;

  const [ requestApi, setRequestApi ] = useState<RequestApi | null>(null)

  const [ responseApi, setResponseApi ] = useState<any>(null)
  
  useEffect(() => {
    if (requestApi && requestApi.method && requestApi.path && requestApi.values) {
      const method = requestApi.method;
      const path = requestApi.path;
      const values = requestApi.values;      
      const url = apiHost+path;

      axios({
        url: url,
        method: method,
        data: method == 'POST' || 'PUT' ? values : null,
        params: method == 'GET' || 'DELETE' ? values : null,
        headers: {
          Authorization: requestApi.token ? `Bearer ${requestApi.token}` : null
        }

      }).then((response) => {
        setResponseApi(response.data)

      }).catch(error => {
        console.log(error)
      })
    
      return () => { return null; }
    }
  }, [requestApi])

  return {
    responseApi,
    setRequestApi,
  }
}

