import { useContext, useEffect, useState } from "react";
import axios, { Method } from 'axios'
import { AppContext } from "@contexts/AppContext";

type Request = {
    method: Method,
    type: string,
    values: {}
}

type Response = {
    status: string,
    message: string,
    token: string,
    data: [
       { 
           name: string 
        }
    ],
    payload: {}
}

export default function useApi() {

  const [ request, setRequest ] = useState<Request | null>(null)

  const [ responseApi, setResponseApi ] = useState<any>(null)

  const { apiHost } = useContext(AppContext);
  
  useEffect(() => {
    if (request && request.method && request.type && request.values) {
      const method = request.method;
      const type = request.type;
      const values = request.values;      
      const url = apiHost+type;

      axios({
        url: url,
        method: method,
        data: method == 'post' ? values : null,
        params: method == 'get' ? values : null

      }).then((response) => {
        setResponseApi(response.data)

      }).catch(error => {
        console.log(error)
      })
    
      return () => { }
    }
  }, [request])

  return {
    setRequest,
    responseApi
  }
}

