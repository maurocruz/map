import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

import { Modal } from "@components/Modal";
import { MapProvider } from "./MapContext";
import Header from "@components/Header/Header";
import { useInitialViewport } from "@hooks/useMap";
import { ViewportInterface } from "@interfaces/index";

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
    geoLocation: boolean,
    setGeoLocation: Function,
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
    setOpenedModals: Function
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

  const [ geocoder, setGeocoder ] = useState(true);
  const [ geoLocation, setGeoLocation ] = useState(true);  
  const [ header, setHeader ] = useState(true);

  const [ longitude, setLongitude ] = useState(Number);
  const [ latitude, setLatitude ] = useState(Number)
  const [ zoom, setZoom ] = useState(Number);
  const [ pitch, setPitch ] = useState(Number);
  const [ bearing, setBearing ] = useState(Number);
  const [ markerQuery, setMarkerQuery ] = useState(null);

  const [ openedModals, setOpenedModals ] = useState<Object>({});

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
        geoLocation,
        setGeoLocation,
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
        setOpenedModals
      }
    }>

      {header && <Header/>}
        
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
