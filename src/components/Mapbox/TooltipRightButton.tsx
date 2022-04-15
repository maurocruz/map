import { ContainerContext } from "@contexts/ContainerContext";
import { CSSProperties, useContext, useRef } from "react";
import { style } from '../../../plinct.config';

const TooltipRightButton = (props: any) => 
{
    const { setFlyTo } = useContext(ContainerContext);

    const mapEvent = props.mapEvent;
    const setRightButton = props.setRightButton;
    const setEventInfo = props.setEventInfo;

    const lng = mapEvent.lngLat.lng;
    const lat = mapEvent.lngLat.lat;
    const top = mapEvent.point.y;
    const left = mapEvent.point.x;

    const divRef = useRef<HTMLDivElement>(null);

    const styleDiv: CSSProperties = {
        position: 'absolute',
        top: top,
        left: left,
        backgroundColor: 'white',
        padding: '4px',
        fontSize: '12px',
        cursor: 'auto',
        zIndex: 10
    }

    const styleButton: CSSProperties = {
        border: `1px solid ${style.color.border.lightGray}`,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        marginBottom: '4px'
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

    // CLOSE TOOLTIP IS CLICK ON MAP
    window.addEventListener('click',(e: any) => {
        if (e.target.getAttribute('id') != 'tooltip-rightButton') {
            setRightButton(null)
            e.preventDefault();
        }
    });    

    // CENTRALIZA ON THO POINT
    function centerHere(e) {
        setFlyTo({
            longitude: lng,
            latitude: lat       
        })
    }

    return (
        <div id='tooltip-rightButton' ref={divRef} style={styleDiv}>
            <button style={styleButton} onClick={handleOnClick}>Copy coordinates to clipboard</button>
            <button style={styleButton} onClick={centerHere}>Center map here</button>
        </div>
    )
}

export default TooltipRightButton;