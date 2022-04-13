import React from 'react'
import { UserPanel } from '@components/User';

import * as styles from './Header.module.scss'

const Header = () => { 

  const style  = styles as any;

  return (
    <div className={style.component}>
      <div className={style.logo}>
        <h1><a href="/">Plinct Map</a></h1>
      </div>
      <UserPanel />
    </div>
  )
}

export default Header
