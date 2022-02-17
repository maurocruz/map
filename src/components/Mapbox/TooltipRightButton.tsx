import { CSSProperties, useRef } from "react";

const TooltipRightButton = (props: any) => {  
    const mapEvent = props.mapEvent;
    const setRightButton = props.setRightButton;
    const setEventInfo = props.setEventInfo;

    const lng = mapEvent.lngLat.lng
    const lat = mapEvent.lngLat.lat
    const top = mapEvent.point.y
    const left = mapEvent.point.x

    const divRef = useRef<HTMLDivElement>(null);

    const styleDiv: CSSProperties = {
        position: 'absolute',
        top: top,
        left: left,
        backgroundColor: 'white',
        padding: '20px',
        fontSize: '12px',
        cursor: 'auto',
        zIndex: 10
    }

    const styleButton: CSSProperties = {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer'
    }

    // copy lngLat to clipboard
    function handleOnClick() {
        const clipText = lat + ", " + lng;
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