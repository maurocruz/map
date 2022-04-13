import { useContext, useEffect, useRef, useState } from "react";
import { Router } from "next/router";
import mapboxgl, { MapboxOptions, Marker } from "mapbox-gl";
import { ChangeTileset, geoCoderControl, geoLocateControl, scaleBar, zoomControl } from "./Controls";

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from "@components/EventInfo";

import { FeatureModal } from '@components/Modal'
import { ContainerContext } from "@contexts/ContainerContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const mapStreet = "mapbox://styles/maurocruz/ckur99bp404ze15o0icj8kt6h"
const mapSattelite = "mapbox://styles/maurocruz/ckxgf6qdl0p4g14rrqmkr7vh5"
const dataSource = "https://pirenopolis.tur.br/api/place?format=geojson&limit=none";

import style from './Mapbox.module.scss';

/**
 * MAPBOX FUNCTION 
 */
const MapGl = () => 
{
  // CONTEXTS
  const { longitude, setLongitude, latitude, setLatitude, zoom, setZoom, pitch, setPitch, bearing, setBearing, pushState } = useContext(ContainerContext);    
  const { geocoder, geoLocation, flyTo, viewport } = useContext(ContainerContext);

  const mapContainer = useRef();
  const [ map, setMap ] = useState<mapboxgl.Map>(undefined);

  const [ mapStyle, setMapStyle ] = useState(mapStreet)
  const [ rightButton, setRightButton ] = useState(null)
  const [ eventInfo, setEventInfo ] = useState(null);
  //const [ geojson, setGeojsonson ] = useState(dataLocation.geojson);

  //### FLY TO ###//
  useEffect(() => {
    if (flyTo) {
      map.flyTo({
        center: [flyTo.longitude, flyTo.latitude],
        zoom: flyTo.zoom,
        pitch: flyTo.pitch,
        bearing: flyTo.bearing
        
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
    geocoder && geoCoderControl(map);
    geoLocation && geoLocateControl(map);
    scaleBar(map);
    zoomControl(map);
  },[viewport]);

  /** CHANGE STYLE */
  useEffect(() => {
    if(map) {
      map.setStyle(mapStyle);
    }
  },[mapStyle]);

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

  /*useEffect(() => {
    // create the map 
    const map = new mapboxgl.Map({
    container: mapContainer.current,
    style: mapStyle,
    center: {lng: viewport.longitude, lat: viewport.latitude},
    zoom: viewport.zoom,
    pitch: viewport.pitch,
    bearing: viewport.bearing
    })



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
        setLongitude(map.getCenter().lng);     
        setCenter(map.getCenter());
        setZoom(map.getZoom());
        setPitch(map.getPitch());
        setBearing(map.getBearing());
      })

      map.on('moveend', function(e) {
      })

      map.on('contextmenu', (e) => {
        setRightButton(e);
      })
    })

    // cleanup function to remove map on unmount
    return () => map.remove()

  }, [mapStyle, viewport, geojson]);*/

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
