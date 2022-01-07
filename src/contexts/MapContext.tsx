import { createContext, useState } from "react";
import DataInterface from "src/interfaces/DataInterface";

import Data from '../lib/Data'

type MapContextType = {
    dataLocation: DataInterface,
    setDataLocation: any
}

export const MapContext = createContext({} as MapContextType)

export function MapProvider({ children }) {

  const dataStart = new Data();
  dataStart.setViewPort().latitude(-15.791592864042546).longitude(-47.889556334719465).zoom(5)

  const [ dataLocation , setDataLocation ] = useState(dataStart.ready())

  return (
    <MapContext.Provider value={{ dataLocation, setDataLocation }}>
        {children}
    </MapContext.Provider>
  )
}
