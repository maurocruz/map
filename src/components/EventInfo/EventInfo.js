import * as React from 'react'

import * as styles from './EventInfo.module.css'

const EventInfo = ({ children }) => {
  return (
    <div className={styles.component}>
      {children}
    </div>
  )
}

export default EventInfo
