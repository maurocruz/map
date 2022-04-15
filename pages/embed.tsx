import { useUser } from "@hooks/useUser";
import { useContext, useEffect } from "react";
import { ContainerContext } from "../src/contexts";

export default function Embed() 
{
  const { getUser } = useUser();
  const { setGeocoder, setGeoLocation, setHeader } = useContext(ContainerContext)
  
  useEffect(() => {
    getUser(null);
    setGeocoder(false);
    setGeoLocation(false);
    setHeader(false)
  },[])

  return null
}
