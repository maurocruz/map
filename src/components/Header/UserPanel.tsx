
import { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { destroyCookie } from 'nookies'

import { ContainerContext } from '@contexts/ContainerContext';
import { AppContext } from '@contexts/AppContext';

import * as styles from './UserPanel.module.scss'

const UserPanel = () => {

    const { toogleModal, setModalName } = useContext(ContainerContext)

    const { user, isAuthenticated, setToken } = useContext(AppContext)

    const [ showPanel, setShowPanel ] = useState(false)

    const style  = styles as any;

    function _onClickAccount(e) {
      if (isAuthenticated) {
        if(showPanel) {
          setShowPanel(false)
        } else {
          setShowPanel(true);
        }
        
      } else {
        toogleModal(false)
        setModalName('login')
        e.stopPropagation()
      }
    }

    function handleLogout() {
        setToken();
        destroyCookie(undefined, 'plinctmap.token');        
        setShowPanel(false)    
    }

    return (
        <div className={style.userPanel}>
          <div className={style.avatar} onClick={_onClickAccount}>
            {isAuthenticated 
              ? <Icon icon="mdi:account-cog" /> 
              : <Icon icon="mdi:account" /> 
            }
          </div>
        {isAuthenticated && showPanel &&
          <div className={style.panel}>
            <p>{user.name}</p>
            <button>Edit profile</button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        }  
        </div>
    )

}

export default UserPanel;