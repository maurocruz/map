import React from 'react'
import { Icon } from '@iconify/react';

import * as styles from './Header.module.scss'

const Header = () => {

    const style  = styles as any;

  function _onClickAccount() {
    alert("Under development")

  }

  return (
    <div className={style.component}>
      <div className={style.logo}>
        <h1>Plinct Map</h1>
      </div>
      <div className={style.controls}>
        <Icon className={style.controlsAccount} icon="mdi:account" onClick={_onClickAccount} />
      </div>
    </div>
  )
}

export default Header