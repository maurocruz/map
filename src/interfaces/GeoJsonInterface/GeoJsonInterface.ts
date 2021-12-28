interface Properties {
    id: number,
    name: string,
    style: string
}

interface Geometry {
    type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon' | 'GeometryCollection',
    coordinates: [number, number]
}

interface FeatureInterface {
    type: 'Feature',
    geometry: Geometry,
    properties: Properties

}

interface GeoJsonInterface {
    type: 'FeatureCollection'
    features: FeatureInterface[]
}

export type { FeatureInterface, GeoJsonInterface };