
import { useContext, useEffect } from 'react';

import { ContainerContext } from '@contexts/ContainerContext';
import { BarsLeftContext } from '@contexts/BarsLeftContext';

import { IconSearch } from "@components/Icons";

import css from './bars.module.scss';
import ShareMenu from './ShareMenu';
import LayersMenu from './LayersMenu';

export default function LeftBar() 
{
  const { geocoder, setGeocoder } = useContext(ContainerContext);

  const { setShowLayers, setShowShare } = useContext(BarsLeftContext);

  useEffect(() => {    
      setGeocoder(false);
      setShowLayers(false);
      setShowShare(false);    
  },[]);

  useEffect(() => {
    if (geocoder) {
      setShowLayers(false);
      setShowShare(false);
    }
  },[geocoder])

  
  return (
    <div className={css.barsContainer}>
      <div className={css.barsMain}>
        <div className={css.barsIconMain} onClick={() => setGeocoder(!geocoder)}>
          <IconSearch width={24} style={{cursor: 'pointer'}}/>
        </div>
      </div>

      <LayersMenu />

      <ShareMenu />     
           
    </div>
  )
}