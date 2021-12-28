import { Icon } from "@iconify/react";
import { Marker } from "react-map-gl";
import { FeatureInterface } from "src/interfaces";

const Points = (props: any) => {

    const feature = props.feature as FeatureInterface;
    
    const coordinates = feature.geometry.coordinates
    const lng = coordinates[0]
    const lat = coordinates[1]
    const style = feature.properties.style;
    
    // POINT DEFAULT
    const IconPoi = (
        <Marker longitude={lng} latitude={lat} offsetLeft={-15} offsetTop={-20}>
            <Icon icon="gis:poi" color="#006ed6" width='30px' />
            <div style={{fontSize: '0.7em', backgroundColor: 'rgba(255,255,255,0.8)'}}>{feature.properties.name}</div>
        </Marker>
    )

    // POINT USER LOCATION
    const IconUseLocation = (
        <Marker longitude={lng} latitude={lat} offsetLeft={0} offsetTop={0}>
            <Icon icon="gis:location-on" style={{
                color: '#006ed6',
                width: '20px'
            }} />
        </Marker>
    )

    return style == 'useLocation' ? IconUseLocation : IconPoi   
}

export default Points
