import { CSSProperties, useRef } from "react";
import { MapEvent } from "react-map-gl";


const TooltipRightButton = (props: any) => {  
    const mapEvent = props.mapEvent as MapEvent;
    const setRightButton = props.setRightButton;
    const setEventInfo = props.setEventInfo;

    const lng = mapEvent.lngLat[0]
    const lat = mapEvent.lngLat[1]
    const top = mapEvent.point[1]
    const left = mapEvent.point[0]

    const divRef = useRef<HTMLDivElement>(null);

    const styleDiv: CSSProperties = {
        position: 'absolute',
        top: top,
        left: left,
        backgroundColor: 'white',
        padding: '20px',
        fontSize: '12px',
        cursor: 'auto'
    }

    const styleButton: CSSProperties = {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer'
    }

    // copy lngLat to clipboard
    function handleOnClick() {
        const clipText = mapEvent.lngLat[1] + ", " + mapEvent.lngLat[0];
        navigator.clipboard.writeText(clipText).then(() => {
            setEventInfo(<p>Copied coordinates to clipboard!</p>)
            setTimeout(() => {
               setEventInfo(null)
            },3000)
        });
    }

    window.addEventListener('click',(e: any) => {
        if (e.target.getAttribute('id') != 'tooltip-rightButton') {
            setRightButton(null)
            e.preventDefault();
        }
    });    

    return (
        <div id='tooltip-rightButton' ref={divRef} style={styleDiv}>
            <button style={styleButton} onClick={handleOnClick}>{lat}, {lng}</button>
        </div>
    )
}

export default TooltipRightButton;