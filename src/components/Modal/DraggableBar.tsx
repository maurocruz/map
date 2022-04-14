import { Icon } from '@iconify/react';

import styles from './modal.module.scss'

export default function DraggableBar({title, retractContent, closeContainer, isRetracted}) 
{
  return(
    <div className={styles.draggableBar}>            
      <div className={styles.draggableMove}>
        <Icon icon="uil:draggabledots" />
      </div>
      <div className={styles.draggableTitle} onDoubleClick={retractContent}>{title}</div>
      <div className={styles.draggableBarButtons}>
        <button className={styles.draggableBarRetracter} onClick={retractContent} onTouchEnd={retractContent}>
            {isRetracted 
              ? <Icon icon="fluent:arrow-eject-20-filled" color="white" width={'1.3em'} rotate={2} /> 
              : <Icon icon="fluent:arrow-eject-20-filled" color="white" width={'1.3em'} />
            }
        </button>
        <button className={styles.draggableBarClose} onClick={closeContainer} onTouchEnd={closeContainer}>
            <Icon icon="eva:close-fill" color='#fff' width={'1.5em'} />
        </button>
      </div>
    </div>
  )
}
