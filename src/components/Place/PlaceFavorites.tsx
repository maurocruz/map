import React, { useContext, useEffect, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';

import { AppContext } from '@contexts/AppContext';
import { ContainerContext } from '@contexts/ContainerContext';
import { useFavoritesPlace } from '@hooks/usePlace';
import { ViewportInterface } from '@interfaces/index';
import { IconFlyTo, IconTrash, IconDraggableDots, IconArrowBack, IconSave } from '@components/Icons';

import css from './favplaces.module.scss'

import { style } from '../../../plinct.config';

type Favplaces = {
  idmap_viewport: number,
  name: string;
  initial: number,
  viewport: ViewportInterface
}

/**
 * 
 * 
 * @returns 
 */
export default function PlaceFavorites() 
{
  const { user } = useContext(AppContext);
  const { setFlyTo, viewport } = useContext(ContainerContext);
 
  const { favPlaceResponse, saveFavPlaces, getFavPlaces, deleteFavPlace, request_changePositionFavplaces } = useFavoritesPlace();

  const formRef = useRef(null);
  const inputTextRef = useRef<HTMLInputElement>(null);

  const [ isSaveForm, setIsSaveForm ] = useState(false);
  const [ favPlacesList, setFavPlacesList ] = useState(null);
  const [ formsaveMessage, setFormsaveMessage ] = useState(null);

  //  RESET FAV PLACES IF !USER
  useEffect(() => {
    getFavPlaces(user);
  },[user]);

  // RESPONSE API
  useEffect(() => {
    if (favPlaceResponse && favPlaceResponse.status == "success") {
      if (favPlaceResponse.method == 'GET') {
        setFavPlacesList(favPlaceResponse.data);
      } else {
        getFavPlaces(user);
      }
    }

    return () => {
      return null;
    }

  },[favPlaceResponse])

  // FOCUS IN FORM NAME
  useEffect(() => {
    if (isSaveForm) {
      inputTextRef.current.focus();
    }
  },[isSaveForm]);

  function _saveThisViewport(e) {
    const name  = formRef.current.elements.name.value;
    if (name) {      
      saveFavPlaces(name, JSON.stringify(viewport), user.uid);
      _cancelForm();
    } else {
      setFormsaveMessage('Oh, no! name is mandatory!');
      inputTextRef.current.focus();
    }
    e.preventDefault();
  }

  function delFavPlace(idmap_viewport) {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteFavPlace(idmap_viewport);
    }
  }

  function _openForm() {
    setIsSaveForm(true);  
  }

  function _cancelForm() {
    setFormsaveMessage(null);
    setIsSaveForm(false);
  }

  function grabbing(e) {
    e.currentTarget.style.cursor = 'grabbing';
  }

  function grab(e) {
    e.currentTarget.style.cursor = 'grab';
  }

  function changePosition(e) {
    e.forEach(element => {
      request_changePositionFavplaces(element.i,(element.y+1).toString());
    });
  }

  return (
    <div className={css.favplacesContainer}>

      <h4 className={css.favplacesTitle}>Favorites places</h4>

      <div className={css.favplacesForm}>
      {isSaveForm 
        ? <form ref={formRef} className={css.favplacesFormsave}>
          {formsaveMessage && <p className={css.favplacesFormsaveMessage}>{formsaveMessage}</p>}
          <input ref={inputTextRef} className={css.favplacesFormsaveName} name='name' defaultValue='' placeholder='Set a name' required/>
          <button className={css.favplacesFormsaveSubmit} type='submit' onClick={_saveThisViewport}>
            <IconSave color="#229630" width={28} />
          </button>
          <button className={css.favplacesFormsaveCancel} onClick={_cancelForm}>
            <IconArrowBack width="18" />
          </button>
        </form> 

        : <button className={css.saveFavplacesButton} onClick={_openForm} onTouchEnd={_openForm}>Save this viewport</button>
      }
      </div>

      {favPlacesList && 
        <GridLayout
          cols={1}
          width={240}
          rowHeight={28}
          autoSize={true}
          isResizable={false}
          className={css.favplacesList}
          margin={[0,5]}
          onDragStop={changePosition}
        >
          {favPlacesList.map((favplace: Favplaces) => {
            return (
              <div key={favplace.idmap_viewport} className={css.favplacesListItem}>

                  <div className={css.favplacesListItemDraggabledots} onMouseDown={grabbing} onTouchStart={grabbing} onMouseUp={grab} onTouchEnd={grab}> 
                    <IconDraggableDots width={20}/>
                  </div>

                  <div className={css.favplacesListItemTitle} onMouseDown={grabbing} onTouchStart={grabbing} onMouseUp={grab} onTouchEnd={grab}>{favplace.name}</div>

                  <div className={css.favplacesListItemButtons}>
                    <button className={css.favplacesListItemButtonFlyto} onClick={() => setFlyTo(favplace.viewport)} onTouchEnd={()=>setFlyTo(favplace.viewport) }>
                      <IconFlyTo width={26} color={style.color.icon.blue} />
                    </button>               
                    <button className={css.favplacesListItemButtonDelete} onClick={() => delFavPlace(favplace.idmap_viewport)} onTouchEnd={() => delFavPlace(favplace.idmap_viewport)}>
                      <IconTrash width={16} color={style.color.icon.red} />
                    </button>
                  </div>
              </div>
            )
          })}
        </GridLayout>
      }
    </div>
  )
}
