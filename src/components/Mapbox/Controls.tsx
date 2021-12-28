import { CSSProperties, useState } from "react"

/**
 * MUDA O TILESET (FUNDO DO MAPA)
 * @param param0 
 * @returns 
 */
const ChangeTileset = ({mapStyle, setMapStyle, mapStreet, mapSattelite}) => 
{
    const imageStreet = "/media/streets-style-icon.6cda255c.png";
    const textStreet = "Streets";
    const imageSattelite = "/media/satellite-style-icon.f45844d1.png";
    const textSattelite = "Sattelite";

    const [ imgBackground, setImgBackground ] = useState(imageSattelite)
    const [ textSpan, setTextSpan ] = useState(textSattelite)

    const buttonStyle: CSSProperties = {
        position: 'absolute',
        right: '24px',
        bottom: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '60px',
        height: '60px',
        boxSizing: 'initial',
        boxShadow: '0 2px 4px rgba(21,45,72,.25)',
        backgroundSize: 'cover',
        borderRadius: '8px',
        border: '2px solid #fff',
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 28.47%), url(${imgBackground})`,
        cursor: 'pointer'
    }

    const spanStyle: CSSProperties = {
        marginLeft: '3px',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#fff'
    }

    function _onClick() {
        if(mapStyle == mapStreet) {
            setMapStyle(mapSattelite);
            setImgBackground(imageStreet);
            setTextSpan(textStreet);
        } else {
            setMapStyle(mapStreet);
            setImgBackground(imageSattelite);
            setTextSpan(textSattelite);
        }
    }

    return (
        <button style={buttonStyle} onClick={_onClick}>
            <span style={spanStyle}>{textSpan}</span>
        </button>        
    )
}


export { ChangeTileset }