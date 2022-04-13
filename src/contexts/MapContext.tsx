import { createContext, useState } from "react";

type MapContextType = {
  center: {lng:number,lat:number},
  setCenter: Function,
  marker: boolean
}

export const MapContext = createContext({} as MapContextType)

/**
 * MAP CONTEXT FUNCTION
 * 
 * @param param0 
 * @returns 
 */
export function MapProvider({ children }) 
{  
  const [ center, setCenter ] = useState();

  const [ marker, setMarker ] = useState(false);

  return (
    <MapContext.Provider value={{ 
      center, 
      setCenter, 
      marker
    }}>
        {children}
    </MapContext.Provider>
  )
}
