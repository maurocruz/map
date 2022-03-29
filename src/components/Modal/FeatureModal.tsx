
import { ContainerContext } from "@contexts/ContainerContext";
import { useContext } from "react";
import { useModal } from "src/hooks";
import { FeatureInterface } from "src/interfaces";


const FeatureModal = ({feature}) => 
{    
    console.log(feature);
    return (<p>Feature Modal.....</p>)
}

export default FeatureModal;