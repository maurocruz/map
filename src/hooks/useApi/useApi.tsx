import { useEffect, useState } from "react";
import axios, { Method } from 'axios'

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

    const [ request, setRequest ] = useState<Request>()

    const [ response, setResponse ] = useState<Response>()
    
    useEffect(() => {
        if (request) {
            const method = request.method;
            const type = request.type;
            const values = request.values;
            const querystrings = new URLSearchParams(request.values);
            const url = `https://plinct.local/api/${type}`

            axios({
                url: url,
                method: method,
                data: values

            }).then((response) => {
                setResponse(response.data)

            }).catch(error=>{
                console.log(error)

            })

        }
    }, [request])

    return {
        request,
        setRequest,
        response
    }
}

