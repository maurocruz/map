import React, { useContext } from 'react'
import { Icon } from '@iconify/react';

import * as styles from './Header.module.scss'
import { ContainerContext } from '@contexts/ContainerContext';

const Header = () => {

  const { toogleModal, setModalName } = useContext(ContainerContext)

  const style  = styles as any;

  function _onClickAccount(e) {
    toogleModal()
    setModalName('login')
    e.stopPropagation()
  }

  return (
    <div className={style.component}>
      <div className={style.logo}>
        <h1><a href="/">Plinct Map</a></h1>
      </div>
      <div className={style.controls}>
        <Icon className={style.controlsAccount} icon="mdi:account" onClick={_onClickAccount} />
      </div>
    </div>
  )
}

export default Header
