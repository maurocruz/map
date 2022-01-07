import React, { useContext } from 'react'
import { Icon } from '@iconify/react';

import { Login } from '../ContainerOverlay'

import * as styles from './Header.module.scss'
import { ContainerContext } from 'src/contexts'

const Header = () => {

  const { setOverlay } = useContext(ContainerContext)

  const style  = styles as any;

  function _onClickAccount(e) {
    e.stopPropagation()  
    setOverlay(Login)
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
