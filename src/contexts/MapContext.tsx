import { useApi } from "@hooks/useApi";
import { createContext, useEffect, useState } from "react";
import DataInterface from "src/interfaces/DataInterface";

import Data from '../lib/Data'

type MapContextType = {
    dataLocation: DataInterface,
    setDataLocation: any
}

export const MapContext = createContext({} as MapContextType)

export function MapProvider({ children }) {

  const dataStart = new Data();
  // posição inicial : PIRENÓPOLIS 
  // TODO dado que deve ser consfigurado e armazenado pelo usuário
  dataStart.setViewPort().latitude(-15.853947877733347).longitude(-48.95984155940647).zoom(12)

  const [ dataLocation , setDataLocation ] = useState(dataStart.ready())

  return (
    <MapContext.Provider value={{ dataLocation, setDataLocation }}>
        {children}
    </MapContext.Provider>
  )
}
