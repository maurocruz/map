import { AppContext } from "@contexts/AppContext";
import { useApi } from "@hooks/useApi";
import { useContext, useEffect, useState } from "react";

export default function userUpdate() 
{
  const { token } = useContext(AppContext);

  const { responseApi, setRequestApi } = useApi();

  const [ values, setValues ] = useState(null);

  useEffect(() => {
    if (values) {
      setRequestApi({
        path: "user",
        method: 'PUT',
        values: values,
        token: token
      })
    }

    return () => {
      return null;
    }

  },[values])

  return {
    setValues,
    responseApi
  }
}
