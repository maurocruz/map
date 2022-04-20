import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

import { mapStyles } from '../../plinct.config';

import { MapProvider, BarsLeftProvider } from '@contexts/index'

//import { MapProvider } from "./MapContext";

import { useInitialViewport } from "@hooks/useMap";
import { ViewportInterface } from "@interfaces/index";
import { Modal } from "@components/Modal";
import Header from "@components/Header/Header";
import LeftBar from "@components/Bars/LeftBar";
import { BarsLeftContext } from "./BarsLeftContext";

const MapGl = dynamic(
  () => import('@components/Mapbox/MapGl'),
  {
    loading: () => <div className='iconLoading'><Icon icon="eos-icons:loading" /></div>,
    ssr: false
  }
);

type ContainerContextType = {
    geocoder: boolean,
    setGeocoder: Function,
    geolocate: boolean,
    setGeolocate: Function,
    header: boolean,
    setHeader: Function,
    viewport: ViewportInterface,
    setViewport: Function,
    longitude: number,
    setLongitude: Function,
    latitude: number,
    setLatitude: Function,
    zoom: number,
    setZoom: Function,
    pitch: number,
    setPitch: Function,
    bearing: number,
    setBearing: Function,
    markerQuery: string | string[],
    setMarkerQuery: Function
    pushState: Function,
    flyTo: ViewportInterface,
    setFlyTo: Function,
    openedModals: Object,
    setOpenedModals: Function,
    showLeftBar: boolean,
    setShowLeftBar: Function,
    mapStyle: string,
    setMapStyle: Function,
    eventInfo: string,
    setEventInfo: Function
}

const ContainerContext = createContext({} as ContainerContextType)


/**
 * 
 * CONTAINER CONTEXT
 *  
 * @param param0 
 * @returns 
 */
const ContainerProvider = ({children}) => 
{ 
  const Router = useRouter();
  const query = Router.query;
  const isQuery = Object.keys(query).length > 0 ? true : null;

  const { initialViewport } = useInitialViewport();  

  const [ viewport, setViewport ] = useState<ViewportInterface>(initialViewport);
  const [ flyTo, setFlyTo] = useState<ViewportInterface>();

  const [ geocoder, setGeocoder ] = useState(false);
  const [ geolocate, setGeolocate ] = useState(true);  
  const [ mapStyle, setMapStyle ] = useState(mapStyles.outdoors.style);
  const [ header, setHeader ] = useState(true);

  const [ longitude, setLongitude ] = useState(Number);
  const [ latitude, setLatitude ] = useState(Number)
  const [ zoom, setZoom ] = useState(Number);
  const [ pitch, setPitch ] = useState(Number);
  const [ bearing, setBearing ] = useState(Number);
  const [ markerQuery, setMarkerQuery ] = useState(null);
  const [ openedModals, setOpenedModals ] = useState<Object>({});
  const [ showLeftBar, setShowLeftBar ] = useState(false);

  const [ eventInfo, setEventInfo ] = useState(null);

  // UPDATE INITIAL VIEWPORT
  useEffect(() => {
    setViewport(initialViewport);
  },[initialViewport])

  // UPDATE MAP PROPRITIES
  useEffect(() => {
    if (viewport) {
      // LONGITUDE    
      const longitudeQuery = query.longitude || query.lng || null;
      const lng = (isQuery && typeof(longitudeQuery)=='string') ? parseFloat(longitudeQuery) : viewport.longitude;
      setLongitude(lng);
      // LATITUDE
      const latitudeQuery = query.latitude || query.lat || null;
      const lat = (isQuery && typeof(latitudeQuery)=='string') ? parseFloat(latitudeQuery) : viewport.latitude;
      setLatitude(lat);
      // ZOOM
      const zoomQuery = query.zoom || query.z || null;
      const z = (isQuery && typeof(zoomQuery)=='string') ? parseFloat(zoomQuery) : viewport.zoom;
      setZoom(z);
      // PITCH
      const pitchQuery = query.pitch || query.p || null;
      const p = (isQuery && typeof(pitchQuery)=='string') ? parseFloat(pitchQuery) : viewport.pitch;
      setPitch(p);
      // BEARING
      const bearingQuery = query.bearing || query.b || null;
      const b = (isQuery && typeof(bearingQuery)=='string') ? parseFloat(bearingQuery) : viewport.bearing;
      setBearing(b);
      // MARKER
      const markerQuery = query.marker || query.name || query.propertyName || null;
      setMarkerQuery(markerQuery);
    }
  },[query,viewport]);
  
  // push state on url bar
  function pushState(longitude: number, latitude: number, zoom: number, pitch: number, bearing: number) 
  {  
    const path = `/?lng=${longitude}&lat=${latitude}&z=${zoom.toFixed(2)}&p=${pitch.toFixed(2)}&b=${bearing.toFixed(2)}`;
    Router.push(path, undefined, { shallow: true });
  }

  return (
    <ContainerContext.Provider 
      value={{ 
        geocoder, 
        setGeocoder,
        geolocate,
        setGeolocate,
        header,
        setHeader,
        viewport,
        setViewport,
        longitude,
        setLongitude,
        latitude,
        setLatitude,
        zoom,
        setZoom,
        pitch,
        setPitch,
        bearing,
        setBearing,
        markerQuery,
        setMarkerQuery,
        pushState,
        flyTo,
        setFlyTo,
        openedModals, 
        setOpenedModals,
        showLeftBar,
        setShowLeftBar,
        mapStyle,
        setMapStyle,
        eventInfo,
        setEventInfo
      }
    }>

      {header && <Header/>}

      <BarsLeftProvider>
        {showLeftBar && <LeftBar />}
      </BarsLeftProvider>
        
      {children}
      
      {openedModals && openedModals['login'] && <Modal modalName={'login'}/>}
      {openedModals && openedModals['register'] && <Modal modalName={'register'}/>}
      {openedModals && openedModals['PlaceFavorites'] && <Modal modalName={'PlaceFavorites'}/>}
      {openedModals && openedModals['userEdit'] && <Modal modalName={'userEdit'}/>}

      <MapProvider>
        <MapGl />
      </MapProvider>
        
    </ContainerContext.Provider>
  )
}

export { ContainerContext, ContainerProvider }
