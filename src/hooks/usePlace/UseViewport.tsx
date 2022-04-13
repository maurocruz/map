import { useContext, useEffect, useState } from "react";
import { AppContext } from "@contexts/AppContext";
import { useApi } from "@hooks/useApi";
import { Viewport } from "src/lib";
import ViewportInterface from "@interfaces/ViewportInterface";
import { useRouter } from "next/router";

// BRASÍLIA
const defaultViewport = new Viewport()
    .latitude(-15.807245445630727)
    .longitude(-47.8326508822978)
    .zoom(3)
    .ready();
    
export default function useViewport() 
{
  const { user, token } = useContext(AppContext)

  const { responseApi, setRequestApi } = useApi();

  const [ zoom, setZoom ] = useState(undefined);
  const [ viewport, setViewport ] = useState<ViewportInterface>(defaultViewport);

  // QUERY STRINGS
  const Router = useRouter();
  const queryViewport = Router.query;
  useEffect(() => {
    
    if (Object.keys(queryViewport).length > 0) {
      
      const queryZoom = queryViewport.z || queryViewport.zoom || null;
      if (queryZoom && typeof(queryZoom) == 'string') {
        viewport.zoom = parseInt(queryZoom);
        setZoom(queryZoom);
      }
      setViewport(viewport);
    }

    return () => {
      return null;
    };
  },[queryViewport])

  useEffect(() => {
    if (responseApi) {
      if (responseApi.data.length == 1) {
        setViewport(responseApi.data[0].viewport);
      }
    }

    return () => {
      return null;
    }
  },[responseApi])

  function getInitialViewport() {
    if (user) {
      setRequestApi({
        path: 'map/viewport',
        method: 'GET',
        values: {
          iduser: user.uid,
          limit: 1
        },
        token: token
      })
    }
  }

  function getQueryViewport(queryViewport) {
    const queryZoom = queryViewport.z || queryViewport.zoom || null;
    if (queryZoom && typeof(queryZoom) == 'string') {
      viewport.zoom = parseInt(queryZoom);
    }

    return viewport;
  }

  return {
    zoom,
    setZoom,
    viewport,
    setViewport,
    getInitialViewport,
    queryViewport,
    getQueryViewport
  }
}
