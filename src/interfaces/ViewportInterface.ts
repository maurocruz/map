
interface ViewportInterface {
    type: string,
    transitionDuration: number,
    transitionInterpolator: Object
    latitude: number,
    longitude: number,
    zoom: number,
    bbox: [[number,number],[number,number]],
}

export default ViewportInterface