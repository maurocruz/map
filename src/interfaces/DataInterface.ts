import { GeoJsonInterface } from "./GeoJsonInterface/GeoJsonInterface";
import ViewportInterface from "./ViewportInterface";

export default interface DataInterface {
    type: String,    
    viewport: ViewportInterface,
    geojson: GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry> | string
}