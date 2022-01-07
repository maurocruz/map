import { createContext, useEffect, useState } from "react";

type ContainerOverlayContextType = {
    overlay: any,
    setOverlay: Function,
    isVisible: boolean, 
    setIsVisible: Function
}

const ContainerContext = createContext({} as ContainerOverlayContextType)

const ContainerProvider = ({ children }) => {

    const [ overlay, setOverlay ] = useState(null)

    const [ newChildren, setNewChildren ] = useState(children)

    const [ isVisible, setIsVisible ] = useState(false)

    useEffect(()=>{
        if (overlay) {
            setIsVisible(true);
            setNewChildren([ children[0], overlay ])
        }
    },[overlay])

    useEffect(() => {
        if(isVisible == false) {
            setNewChildren([ children[0] ])
        }
    }, [isVisible])
    

    return (
        <ContainerContext.Provider value={{ overlay, setOverlay, isVisible, setIsVisible }}>
            {newChildren ?? children}
        </ContainerContext.Provider>
    )
}

export { ContainerContext, ContainerProvider }
