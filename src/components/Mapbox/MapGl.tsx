import mapboxgl from "mapbox-gl"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { ChangeTileset } from "./Controls";
import { useEffect, useRef, useState } from "react"

import TooltipRightButton from "./TooltipRightButton";
import EventInfo from "@components/EventInfo";

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

const MapGl = () => {

    const mapContainer = useRef()

    const [ mapStyle, setMapStyle ] = useState(mapStreet)
    const [ center, setCenter ] = useState({ lng: -48.95984155940647, lat: -15.853947877733347 });
    const [ zoom, setZoom ] = useState(13) // 13
    const [ pitch, setPitch ] = useState(50) // 50
    const [ bearing, setBearing ] = useState(0) // 0

    const [ rightButton, setRightButton ] = useState(null)
    const [ eventInfo, setEventInfo ] = useState(null);

    // VALUES QUE DEVEM SER DIMÂMICOS NO FUTURO
    const country = 'br' // país ou local cuja a busca do map deve ser restrito
  
    useEffect(() => {
        // create the map 
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: center,
        zoom: zoom,
        pitch: pitch,
        bearing: bearing
        })

        // CONTROLS
            // Geocoder - search place input
            map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                types: "place",
                countries: country,
                placeholder: "Procurar por cidade..."
            }))

            // button user Geolocation
            map.addControl(new mapboxgl.GeolocateControl(geolocateControl),'top-left');

            // Navigation control (zoom + zoom -)
            map.addControl(new mapboxgl.NavigationControl({}),'top-left');

            // scale bar
            map.addControl(new mapboxgl.ScaleControl({}))            

        // MAP ONLOAD
        map.on("load", () => {

            // Places
            map.addSource("places", {
                type: "geojson",
                data: "https://plinct.local/api/place?format=geojson&limit=none"
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
                map.flyTo({ 
                    center: e.features[0].geometry.coordinates, 
                    zoom: 18
                })
            });
            // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
            map.on('mouseenter', 'cluster-places', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'cluster-places', () => {
                map.getCanvas().style.cursor = '';
            });

            map.on('move',function(e){
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

    }, [mapStyle])

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