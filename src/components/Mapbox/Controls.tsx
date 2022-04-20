import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { PLACE } from '../../../plinct.config';

/**
 * MUDA O TILESET (FUNDO DO MAPA)
 * @param param0 
 * @returns 
 */
/*const ChangeTileset = ({mapStyle, setMapStyle, mapStreet, mapSattelite}) => 
{
    const imageStreet = "/media/streets-style-icon.6cda255c.png";
    const textStreet = "Streets";
    const imageSattelite = "/media/satellite-style-icon.f45844d1.png";
    const textSattelite = "Sattelite";

    const [ imgBackground, setImgBackground ] = useState(mapStyle == mapStreet ? imageSattelite : imageStreet)
    const [ textSpan, setTextSpan ] = useState(mapStyle == mapStreet ? textSattelite : textStreet)

    const buttonStyle: CSSProperties = {
        position: 'absolute',
        right: '24px',
        bottom: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '60px',
        height: '60px',
        boxSizing: 'initial',
        boxShadow: '0 2px 4px rgba(21,45,72,.25)',
        backgroundSize: 'cover',
        borderRadius: '8px',
        border: '2px solid #fff',
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 28.47%), url(${imgBackground})`,
        cursor: 'pointer',
        zIndex: 10
    }

    const spanStyle: CSSProperties = {
        marginLeft: '3px',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#fff'
    }

    function _onClick() {
        if(mapStyle == mapStreet) {
            setMapStyle(mapSattelite);
            setImgBackground(imageStreet);
            setTextSpan(textStreet);
        } else {
            setMapStyle(mapStreet);
            setImgBackground(imageSattelite);
            setTextSpan(textSattelite);
        }
    }

    return (
        <button style={buttonStyle} onClick={_onClick}>
            <span style={spanStyle}>{textSpan}</span>
        </button>        
    )
}*/

// Navigation control (zoom + zoom -)
function zoomControl(mapbox: mapboxgl.Map) { 
    mapbox.addControl(new mapboxgl.NavigationControl({}),'top-left');
}

 // scale bar
function scaleBar(mapbox: mapboxgl.Map) {
    mapbox.addControl(new mapboxgl.ScaleControl({}))  
 }


// button user Geolocation
function geoLocateControl(mapbox: mapboxgl.Map) {
  mapbox.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    }
  ),'top-left');
}

// Geocoder - search place input
function geoCoderControl() {    
    return new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      types: "place",
      countries: PLACE.default.country,
      placeholder: "Procurar por cidade..."
    });
  }

export { zoomControl, scaleBar, geoLocateControl, geoCoderControl }
