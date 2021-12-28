
class GeoJson 
{
    private featureColletion = { 
        type: 'FeatureCollection',
        features: [],
        properties: {}
    };

    private features = []

    private feature = { 
        type: 'Feature',
        geometry: {},
        properties: {}
    } 

    geometry(longitude: number, latitude: number, type = 'Point') {
        this.feature.geometry = {
            type: type,
            coordinates: [longitude,latitude]
        }
        return this;
    }

    properties(name: string, value: any) {
        this.feature.properties[name] = value 
        return this;
    }

    saveFeature() {        
        this.features.push(this.feature)
        this.feature = { type: 'Feature', geometry: {}, properties: {} }
    }

    ready() {   
        this.featureColletion.features = this.features;
        return this.featureColletion
    }
}

export default GeoJson;