import { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import { geoCoderControl, geoLocateControl, scaleBar, zoomControl } from "./Controls";

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from "@components/EventInfo";

import { ContainerContext } from "@contexts/ContainerContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const dataSource = "https://pirenopolis.tur.br/api/place?format=geojson&limit=none";

import style from './Mapbox.module.scss';

/**
 * MAPBOX FUNCTION 
 */
const MapGl = () => 
{
  // CONTEXTS
  const { longitude, setLongitude, latitude, setLatitude, zoom, setZoom, pitch, setPitch, bearing, setBearing, markerQuery, pushState, mapStyle, setMapStyle, eventInfo, setEventInfo } = useContext(ContainerContext);    
  const { geocoder, geolocate, flyTo, viewport } = useContext(ContainerContext);

  const mapContainer = useRef();
  const [ map, setMap ] = useState<mapboxgl.Map>(undefined);

  const [ rightButton, setRightButton ] = useState(null)
  const [ geocoderControl, setGeocoderControl ] = useState(null);

  useEffect(() => {
    if (eventInfo) {
      setTimeout(() => {
         setEventInfo(null)
      },3000);
    }
  },[eventInfo])

  //### FLY TO ###//
  useEffect(() => {
    if (flyTo) {
      const lngFlyTo = flyTo.longitude || longitude;
      const latFlyTo = flyTo.latitude || latitude;
      const zoomFlyTo = flyTo.zoom || zoom;
      const pitchFlyTo = flyTo.pitch || pitch;
      const bearingFlyTo = flyTo.bearing || bearing;
      map.flyTo({
        center: [lngFlyTo, latFlyTo],
        zoom: zoomFlyTo,
        pitch: pitchFlyTo,
        bearing: bearingFlyTo
        
      });
    }
  },[flyTo]);

  /** CREATE MAP */
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: {lng: viewport.longitude, lat: viewport.latitude},
      zoom: viewport.zoom,
      pitch: viewport.pitch,
      bearing: viewport.bearing
    });
    setMap(map);
    // CONTROLS    
    geolocate && geoLocateControl(map);
    scaleBar(map);
    zoomControl(map);
  },[viewport]);

  /** GEOCODER */
  useEffect(() => {
    if(map) {
      if (geocoder) {
        const control = geoCoderControl();
        map.addControl(control);
        setGeocoderControl(control)
      } else if (map.hasControl(geocoderControl)) {
        map.removeControl(geocoderControl);
      }
    }
  },[geocoder]);

  /** CHANGE STYLE */
  useEffect(() => {
    if(map) {
      map.setStyle(mapStyle);
    }
  },[mapStyle]);

  /** SOURCES PLACES API */
  useEffect(() => {
    if(map) {
      map.on("load", () => {
        // Places
        map.addSource("placesApi", {
            type: "geojson",
            data: dataSource
        })
  
        map.addLayer({
          id: "cluster-places",
          type: "symbol",
          source: "placesApi",
          minzoom: 13,
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

      });
    }
  },[map]);

  /** MARKER QUERY */
  useEffect(() => {
    if (map && markerQuery) {
      const name = markerQuery.toString();

      const popup = new mapboxgl.Popup({
        'closeButton': false,
        'anchor': 'left',
        'className': style.mapboxPopup
      })
      .setText(name)
      .setLngLat([longitude, latitude])
      .addTo(map);

      const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    } 
  },[map,markerQuery]);

  /** EVENTS */
  useEffect(() => {
    if(map) {
      map.on('contextmenu', (e) => {
        setRightButton(e);
      })
      .on('move',function(_e){   
        setLongitude(map.getCenter().lng);     
        setLatitude(map.getCenter().lat);
        setZoom(map.getZoom());
        setPitch(map.getPitch());
        setBearing(map.getBearing());
      })
      .on('moveend', function() {
        pushState(map.getCenter().lng, map.getCenter().lat, map.getZoom(), map.getPitch(), map.getBearing());
      });
    }
  },[map]);

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
    </div>
  )
}

export default MapGl;
