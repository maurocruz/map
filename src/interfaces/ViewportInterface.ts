
interface ViewportInterface {
    type: string,
    transitionDuration: number,
    transitionInterpolator: Object
    latitude: number,
    longitude: number,
    zoom: number,
    pitch: number,
    bearing: number,
    bbox: [number[], number[]],
}

export default ViewportInterface