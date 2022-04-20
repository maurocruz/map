import { useContext, useEffect, useRef } from 'react';

import { BarsLeftContext } from '@contexts/BarsLeftContext';
import { IconSearch, IconLayers, IconDot } from "@components/Icons"

import { style, mapStyles } from '../../../plinct.config'
import css from './bars.module.scss';
import { ContainerContext } from '@contexts/index';

const dotMapStyle = <IconDot width={16} color={style.color.icon.blue} />

export default function LayersMenu() 
{
  const { setGeocoder, mapStyle, setMapStyle } = useContext(ContainerContext);
  const { showLayers, setShowLayers, setShowShare } = useContext(BarsLeftContext);

  const layersRef = useRef(null);

  /** LAYERS */
  useEffect(() => {
    if (showLayers) {
      layersRef.current.firstChild.style.backgroundColor = style.color.background.submenu;
      layersRef.current.lastChild.style.backgroundColor = style.color.background.submenu;
      layersRef.current.lastChild.style.top = '28px';
      setGeocoder(false);
      setShowShare(false);
    } else {
      layersRef.current.firstChild.style.backgroundColor = 'white';
    }
  },[showLayers])
  
  return (    
    <div ref={layersRef} className={css.barsMain} data-name={'layers'}>
      <div className={css.barsIconMain} onClick={() => setShowLayers(!showLayers)}>
        <IconLayers width={28} style={{cursor: 'pointer'}}/>
      </div>
      {showLayers && 
        <ul className={css.barsList} style={{top: '28px'}}>
          {Object.entries(mapStyles).map((listItem) => {
            const name = listItem[1].name;
            const style = listItem[1].style;
            const isActived = mapStyle == style;
            const className = isActived ? css.barListItemActived : css.barListItemInactived;              
            return <li key={name} className={className} onClick={(e)=>{isActived ? e.preventDefault() : setMapStyle(style); }} >{isActived && dotMapStyle}{name}</li>              
          })}
        </ul>
      }
    </div>
  )
}