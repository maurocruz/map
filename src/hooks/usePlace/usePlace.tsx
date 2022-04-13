import { useEffect, useState } from "react";
import { useApi } from "@hooks/useApi";

const usePlace = (additType: string) => 
{    
    // POINTS PLACE
    const { responseApi, setRequestApi } = useApi()

    const [ pointsPlace, setPointsPlace ] = useState(null);
    const [ additionalType, setAdditionalType ] = useState(additType);

    useEffect(() => {
        if (responseApi == undefined && additionalType) {
            setRequestApi({
                path: 'place',
                method: 'GET',
                values: {
                    additionalType: additionalType,
                    format: 'geojson'
                }
            });

        } else if(responseApi && responseApi.status == 'success'){
            setPointsPlace(responseApi.data.data);
        }
        
    },[responseApi, additionalType])    

    return { pointsPlace, setAdditionalType }
}

export default usePlace;