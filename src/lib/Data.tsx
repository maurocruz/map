import DataInterface from "src/interfaces/DataInterface";
import GeoJson from "./GeoJson";
import Viewport from "./Viewport"

class Data {
    private data = {
        type: 'Data',
        viewport: {},
        geojson: {}
    }

    private Viewport = new Viewport();

    private GeoJson = new GeoJson();

    setViewPort() {
        return this.Viewport
    }

    setGeojson() {
        return this.GeoJson
    }

    ready() {
        this.data.viewport = this.Viewport.ready()
        this.data.geojson = this.GeoJson.ready()
        return this.data as unknown as DataInterface
    }
}

export default Data