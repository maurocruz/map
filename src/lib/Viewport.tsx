
import { FlyToInterpolator } from 'react-map-gl';

class Viewport 
{
    private viewport = {
        type: "ViewPort",
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator(),
        latitude: 0,
        longitude: 0,
        zoom: 0,
        pitch: 0,
        bearing: 0,
        bbox: []

    }

    zoom(zoom: number) {
        this.viewport.zoom = zoom;
        return this;
    }

    latitude(latitude: number) {
        this.viewport.latitude = latitude;
        return this;
    }

    longitude(longitude: number) {
        this.viewport.longitude = longitude;
        return this;
    }

    pitch(pitch: number) {
        this.viewport.pitch = pitch;
        return this;
    }

    bearing(bearing: number) {
        this.viewport.bearing = bearing;
        return this;
    }

    bbox(lngMax: number, latMax: number, lngMin: number, latMin: number) {        
        this.viewport.bbox = [ [lngMax, latMax ], [lngMin, latMin]];
    }

    ready() {
        return this.viewport;
    }
}

export default Viewport;
