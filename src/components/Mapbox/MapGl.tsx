import mapboxgl, { Marker } from "mapbox-gl"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { ChangeTileset } from "./Controls";
import { useContext, useEffect, useRef, useState } from "react"

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from "@components/EventInfo";

import { FeatureModal } from '@components/Modal'
import { ContainerContext } from "@contexts/ContainerContext";
import { MapContext } from "@contexts/MapContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const geolocateControl = {
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
}

const mapStreet = "mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h"
const mapSattelite = "mapbox://styles/maurocruz/ckxgf6qdl0p4g14rrqmkr7vh5"

import style from './Mapbox.module.scss';

/**
 * MAPBOX FUNCTION
 * 
 * @param props 
 * @returns 
 */
const MapGl = (props: any) => {

  const { dataSource, dataLocation, setCenter, setZoom, setPitch, setBearing, marker } = useContext(MapContext);

  const mapContainer = useRef()

  const [ mapStyle, setMapStyle ] = useState(mapStreet)

  const [ rightButton, setRightButton ] = useState(null)
  const [ eventInfo, setEventInfo ] = useState(null);

  // CONTEXTS
  const { toogleModal, setModalComponent, geocoder, geoLocation } = useContext(ContainerContext)

  // VALUES QUE DEVEM SER DIMÂMICOS NO FUTURO
  const country = 'br' // país ou local cuja a busca do map deve ser restrito

  function handleFeatureClick(feature) {
      toogleModal(true);
      setModalComponent(<FeatureModal feature={feature}/>)
  }

  useEffect(() => {
    const viewPort = dataLocation.viewport;
    const geojson = dataLocation.geojson;

    // create the map 
    const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: mapStyle,
    center: {lng: viewPort.longitude, lat: viewPort.latitude},
    zoom: viewPort.zoom,
    pitch: viewPort.pitch,
    bearing: viewPort.bearing
    })

    /********** CONTROLS ************/
    // Geocoder - search place input
    geocoder && map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      types: "place",
      countries: country,
      placeholder: "Procurar por cidade..."
    }))
    

    // button user Geolocation
    geoLocation && map.addControl(new mapboxgl.GeolocateControl(geolocateControl),'top-left');

    // Navigation control (zoom + zoom -)
    map.addControl(new mapboxgl.NavigationControl({}),'top-left');

    // scale bar
    map.addControl(new mapboxgl.ScaleControl({}))  
    
    // MARKER          
    if (marker) {      
      geojson.features.map(feature => {
        const marker = new mapboxgl.Marker()
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

        const popup = new mapboxgl.Popup({
          'closeButton': false,
          'anchor': 'left',
          'className': style.mapboxPopup
        })
        .setText(feature.properties.name)
        .setLngLat(feature.geometry.coordinates)        
        .addTo(map);

      });
    } 

    // MAP ONLOAD
    map.on("load", () => {
      // Places
      map.addSource("places", {
          type: "geojson",
          data: dataSource
      })

      map.addLayer({
        id: "cluster-places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": ['get','icon-image'],
          "text-field": ["get","name"],
          "text-size": 10,
          "text-offset": [0,0.8],
          'text-anchor': 'top'                          
        },
        paint: {
          "text-color": "#dd2200"
        }
      });




      // Center the map on the coordinates of any clicked circle from the 'circle' layer.
      map.on('click', 'cluster-places', (e: any) => {
          const feature = e.features[0];
          map.flyTo({
          center: feature.geometry.coordinates,
          zoom: 18
        })
        handleFeatureClick(feature);
      });
      // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
      map.on('mouseenter', 'cluster-places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
        
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'cluster-places', () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('move',function(_e){
        setCenter(map.getCenter());
        setZoom(map.getZoom());
        setPitch(map.getPitch());
        setBearing(map.getBearing());
      })

      map.on('contextmenu', (e) => {
        setRightButton(e);
      })
    })

    // cleanup function to remove map on unmount
    return () => map.remove()

  }, [mapStyle, dataLocation])

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100vh" }}>

      {rightButton && 
        <TooltipRightButton 
          mapEvent={rightButton} 
          setRightButton={setRightButton} 
          setEventInfo={setEventInfo}
        />
      }   

      {eventInfo && <EventInfo>{eventInfo}</EventInfo>}   

      <ChangeTileset mapStyle={mapStyle} setMapStyle={setMapStyle} mapStreet={mapStreet} mapSattelite={mapSattelite} />
    </div>
  )
}

export default MapGl;