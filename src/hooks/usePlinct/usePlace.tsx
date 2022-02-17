import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";

const usePlace = (additType: string) => 
{    
    // POINTS PLACE
    const { response, setRequest } = useApi()

    const [ pointsPlace, setPointsPlace ] = useState(null);
    const [ additionalType, setAdditionalType ] = useState(additType);

    useEffect(() => {
        if (response == undefined && additionalType) {
            setRequest({
                type: 'place',
                method: 'GET',
                values: {
                    additionalType: additionalType,
                    format: 'geojson'
                }
            });

        } else if(response && response.status == 'success'){
            setPointsPlace(response.data.data);
        }
        
    },[response, additionalType])    

    return { pointsPlace, setAdditionalType }
}

export default usePlace;