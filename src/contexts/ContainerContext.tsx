import { Modal } from "@components/Modal";
import { createContext, useState } from "react";
import useModal from "src/hooks/useModal/useModal";
import { MapProvider } from "./MapContext";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import Header from "@components/Header/Header";

const MapGl = dynamic(
    () => import('@components/Mapbox/MapGl'),
    {
      loading: () => <div className='iconLoading'><Icon icon="eos-icons:loading" /></div>,
      ssr: false
    }
  )

type ContainerContextType = {
    showModal: boolean,
    toogleModal: Function,
    modalName: string,
    setModalName: Function,
    setModalComponent: Function,
    geocoder: boolean,
    setGeocoder: Function,
    geoLocation: boolean,
    setGeoLocation: Function,
    header: boolean,
    setHeader: Function
}

const ContainerContext = createContext({} as ContainerContextType)

const ContainerProvider = ({children}) => {
    
  const { showModal, toogleModal, modalName, setModalName } = useModal()

  const [ modalComponent, setModalComponent ] = useState();

  const [ geocoder, setGeocoder ] = useState(true);
  const [ geoLocation, setGeoLocation ] = useState(true);  
  const [ header, setHeader ] = useState(true);

  return (
    <ContainerContext.Provider 
      value={{ 
        showModal, 
        toogleModal, 
        modalName, 
        setModalName, 
        setModalComponent, 
        geocoder, 
        setGeocoder,
        geoLocation,
        setGeoLocation,
        header,
        setHeader
      }
    }>

      {header && <Header/>}
        
      {children}

      {showModal && <Modal modalName={modalName} modalComponent={modalComponent} />}

      <MapProvider>
        <MapGl />
      </MapProvider>
        
    </ContainerContext.Provider>
  )
}

export { ContainerContext, ContainerProvider }
