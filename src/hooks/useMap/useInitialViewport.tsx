import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Viewport from "src/lib/Viewport";
import ViewportInterface from "src/interfaces/ViewportInterface";
import { useUser } from "@hooks/useUser";
import { useFavoritesPlace } from "@hooks/usePlace";

// BRASÍLIA
const defaultViewport = new Viewport()
    .latitude(-15.807245445630727)
    .longitude(-47.8326508822978)
    .zoom(4)
    .ready();


export default function useInitialViewport() 
{
  const Router = useRouter();

  const { user } = useUser();
  const { getFavPlaces, favPlaceResponse } = useFavoritesPlace();

  const [ initialViewport, setInitialViewport] = useState<ViewportInterface>(defaultViewport);
  const [ isInitFavPlace, setIsInitiFavPlace ] = useState(true);

  // GET USER FAVORITE PLACE
  useEffect(()=>{
    if (user) {
      getFavPlaces(user);      
    }
  },[user]);
  
  // response api
  useEffect(() => {
    if(favPlaceResponse && isInitFavPlace) {
      setInitialViewport(favPlaceResponse.data[0].viewport)
    }
  },[favPlaceResponse]);

  // GET URL QUERY STRING
  useEffect(() => {
    const queryString = Router.asPath.split('?')[1];

    if (queryString) {

      queryString.split('&').map((nameValueString) => {
        const nameValueArray = nameValueString.split('=');
        const name = nameValueArray[0];
        const value = nameValueArray[1];

        // LONGITUDE
        if (name == 'longitude' || name == 'lng') {
          initialViewport.longitude = parseFloat(value);
        }
        // LATITUDE
        if (name == 'latitude' || name == 'lat') {
          initialViewport.latitude = parseFloat(value);
        }
        // ZOOM
        if (name == 'zoom' || name == 'z') {
          initialViewport.zoom = parseFloat(value);
        }
        // PITCH
        if (name == 'pitch' || name == 'p') {
          initialViewport.pitch = parseFloat(value);
        }
        // BEARING
        if (name == 'bearing' || name == 'b') {
          initialViewport.bearing = parseFloat(value);
        }
        
      });

      setInitialViewport(initialViewport);
      setIsInitiFavPlace(false);
    }
  },[]);

  return {
    initialViewport,
    setInitialViewport
  }
}
