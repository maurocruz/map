import { useUser } from "@hooks/useUser";
import { useContext, useEffect } from "react";
import { ContainerContext } from "../src/contexts";

export default function Embed() 
{
  const { getUser } = useUser();
  const { setHeader, setGeolocate } = useContext(ContainerContext)
  
  useEffect(() => {
    getUser(null);
    setGeolocate(null);
    setHeader(false)
  },[])

  return null
}
