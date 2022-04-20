import React, { useContext } from 'react'
import { Icon } from '@iconify/react';

import { ContainerContext } from '@contexts/ContainerContext';
import { UserPanel } from '@components/User';

import style from './Header.module.scss'

const Header = () => 
{
  const { showLeftBar, setShowLeftBar} = useContext(ContainerContext);

  return (
    <div className={style.headerContainer}>

      <div className={style.headerMenu} onClick={()=>setShowLeftBar(!showLeftBar)} >
        <Icon icon="charm:menu-hamburger" width={'26'} />
      </div>

      <div className={style.headerLogo}>
        <h1><a href="/">Plinct Map</a></h1>
      </div>

      <UserPanel />

    </div>
  )
}

export default Header
