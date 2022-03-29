import { useContext, useEffect } from "react";
import { ContainerContext } from "../src/contexts";

function Embed() {

  const { setGeocoder, setGeoLocation, setHeader } = useContext(ContainerContext)
  
  useEffect(() => {
    setGeocoder(false);
    setGeoLocation(false);
    setHeader(false)
  },[])

  return null
}

export default Embed;
