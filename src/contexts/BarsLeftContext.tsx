import { createContext, useContext, useState } from "react";

type BarsLeftContextType = {
  showShare: boolean,
  setShowShare: Function,
  showLayers: boolean,
  setShowLayers: Function
}

const BarsLeftContext = createContext({} as BarsLeftContextType);

const BarsLeftProvider = ({children}) => 
{
  const [ showShare, setShowShare ] = useState(false);  
  const [ showLayers, setShowLayers ] = useState(false);

  return (
    <BarsLeftContext.Provider 
      value={{
        showShare,
        setShowShare,
        showLayers,
        setShowLayers
      }}>
        {children}
      </BarsLeftContext.Provider>
  )
}

export { BarsLeftContext, BarsLeftProvider }