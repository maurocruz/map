import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '@contexts/AppContext';
import { ContainerContext } from '@contexts/ContainerContext';
import { useFavoritesPlace } from '@hooks/usePlace';
import { ViewportInterface } from '@interfaces/index';
import useModal from '@hooks/useModal/useModal';

type FavPlaces = {
  idmap_viewport: number,
  name: string;
  initial: number,
  viewport: ViewportInterface
}

export default function PlaceFavotites() {

  const { user } = useContext(AppContext);
  const { setFlyTo } = useContext(ContainerContext);

  const { closeModal } = useModal();
  
  const { favPlaceResponse, saveFavPlaces, getFavPlaces, deleteFavPlace } = useFavoritesPlace();

  const [ isSaveForm, setIsSaveForm ] = useState(false);
  const [ favPlacesList, setFavPlacesList ] = useState(null);

  useEffect(() => {
    getFavPlaces(user);
  },[]);

  useEffect(() => {
    if (favPlaceResponse && favPlaceResponse.status == "success") {
      if (favPlaceResponse.method == 'GET') {
        setFavPlacesList(favPlaceResponse.data);
      } else if(favPlaceResponse.method == 'POST') {
        closeModal('PlaceFavorites');
      } else if (favPlaceResponse.method == 'DELETE') {
        getFavPlaces(user);
      }
    }
  },[favPlaceResponse])

  function _saveThisViewport(e) {
    console.log(e.target)
    //saveFavPlaces(e.target.name.value, JSON.stringify(viewport), user.uid);
    e.preventDefault();
  }

  function delFavPlace(idmap_viewport) {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteFavPlace(idmap_viewport);
    }
  }

  return (
    <div>
      <h4>Favorites places</h4>
      {isSaveForm 
        ? <form onSubmit={_saveThisViewport}>
          <input name='name' defaultValue='' placeholder='Set a name' required/>
          <input type='submit' value={'Save viewport'}/>
          <Icon icon="fxemoji:cancellationx" width="32" onClick={()=>setIsSaveForm(false)}/>
        </form> 
        : <button onClick={() => setIsSaveForm(true)}>Save this viewport</button>
      }

      {favPlacesList && 
        <ul>
            {favPlacesList.map((favPlace: FavPlaces) => {
              return <li key={favPlace.idmap_viewport} className="favoritesPlace-itemList">
                <p>{favPlace.name}</p> 
                <button className='favoritesPlace-itemList' onClick={() => setFlyTo(favPlace.viewport)}>Fly to</button>               
                <button onClick={() => delFavPlace(favPlace.idmap_viewport)}>Delete</button>
              </li>
            })}
        </ul>
      }

    </div>
  )
}