import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import DataInterface from "src/interfaces/DataInterface";

import Data from '../lib/Data'

type MapContextType = {
  dataSource: string,
  dataLocation: DataInterface,
  setDataLocation: any,
  center: {lng:number,lat:number},
  setCenter: Function,
  zoom: number,
  setZoom: Function,
  pitch: number,
  setPitch: Function,
  bearing: number,
  setBearing: Function,
  marker: boolean
}

export const MapContext = createContext({} as MapContextType)

/**
 * MAP CONTEXT FUNCTION
 * @param param0 
 * @returns 
 */
export function MapProvider({ children }) {

  const dataSource = "https://pirenopolis.tur.br/api/place?format=geojson&limit=none"

  // posição inicial : BRASÍLIA 
  const latInitial = -15.807245445630727;
  const lngInitial =  -47.8326508822978;;
  const zoomInitial = 9;
  const pitchInitial = 0;
  const bearingInitial = 0;

  const data = new Data();
  data.setViewPort().latitude(latInitial).longitude(lngInitial).zoom(zoomInitial)
  
  const [ dataLocation , setDataLocation ] = useState(data.ready())

  const [ longitude, setLongitude ] = useState(lngInitial);
  const [ latitude, setLatitude ] = useState(latInitial)
  const [ center, setCenter ] = useState({ lng: lngInitial, lat: latInitial });
  const [ zoom, setZoom ] = useState(zoomInitial)
  const [ pitch, setPitch ] = useState(pitchInitial)
  const [ bearing, setBearing ] = useState(bearingInitial)

  const [ marker, setMarker ] = useState(false);

  const Router = useRouter();
  const query = Router.query;

  useEffect(()=>{
    // LONGITUDE
    const lng = query.lng as unknown as number ?? lngInitial;
    setLongitude(lng);
    data.setViewPort().longitude(lng);
    // LATITUDE
    const lat = query.lat as unknown as number ?? latInitial;
    setLatitude(lat)
    data.setViewPort().latitude(lat);
    // CENTER
    setCenter({lng: lng, lat: lat }) 
    // ZOOM
    const zoom = query.z as unknown as number  ?? zoomInitial;
    setZoom(zoom);
    data.setViewPort().zoom(zoom);
    // PITCH
    const pitch = query.p as unknown as number ?? pitchInitial;
    setPitch(pitch);
    data.setViewPort().pitch(pitch);
    // BEARING
    const bearing = query.b as unknown as number ?? bearingInitial;
    setBearing(bearing);
    data.setViewPort().bearing(bearing);

    if (query.propertyName) {
      setMarker(true);
      data.setGeojson().geometry(lng,lat).properties('name',query.propertyName).saveFeature();
    }

    setDataLocation(data.ready());    

  },[query])


  return (
    <MapContext.Provider value={{ dataSource, dataLocation, setDataLocation, center, setCenter, zoom, setZoom, pitch, setPitch, bearing, setBearing, marker }}>
        {children}
    </MapContext.Provider>
  )
}
