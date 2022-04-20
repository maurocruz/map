import { useContext, useState } from 'react';
import { destroyCookie } from 'nookies';

import { AppContext } from '@contexts/AppContext';

import * as styles from './UserPanel.module.scss'
import useModal from '@hooks/useModal/useModal';
import { IconAccount, IconAccountConfiguration } from '@components/Icons';

const UserPanel = () => {

  const { user, setUser, setIsAuthenticated } = useContext(AppContext)  

  const { openModal } = useModal();

  const [ showPanel, setShowPanel ] = useState(false)

  const style  = styles as any;

  function _onClickAccount(e) {
    if (user) {
      if(showPanel) {
        setShowPanel(false)
      } else {
        setShowPanel(true);
      }
      
    } else {
      openModal('login');
      e.stopPropagation();
    }
  }

  function handleLogout() {
    setUser(null);
    setIsAuthenticated(false);
    destroyCookie(undefined, 'plinctmap.token');
    setShowPanel(false);
  }

  function handleUserEdit() {
    setShowPanel(false);
    openModal('userEdit');
  }

  /** FAVORITES PLACE */
  function handleFavoritesPlace() {
    setShowPanel(false);
    openModal('PlaceFavorites')
  }

  return (
    <div className={style.userPanel}>
      <div className={style.avatar} onClick={_onClickAccount}>
        {user 
          ? <IconAccountConfiguration width={'2em'} /> 
          : <IconAccount width={'2em'} /> 
        }
      </div>
    {user && showPanel &&
      <div className={style.panel}>
        <p>{user.name}</p>
        <button onClick={handleFavoritesPlace}>Favorites place</button>
        <button onClick={handleUserEdit}>Edit profile</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
    }  
    </div>
  )
}

export default UserPanel;
