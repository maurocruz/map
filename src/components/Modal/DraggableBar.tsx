import { Icon } from '@iconify/react';

import styles from './modal.module.scss'

export default function DraggableBar({title, retractContent, closeContainer}) 
{
    return(
        <div id='draggableBar' className={styles.draggableBar}>            
            <div id="draggable" className={styles.draggableMove}>
                <Icon icon="uil:draggabledots" />
            </div>
            <div className={styles.draggableTitle} onDoubleClick={retractContent}>{title}</div>
            <div id="close" className={styles.draggableClose} onClick={closeContainer} onTouchEnd={closeContainer}>
                <Icon icon="eva:close-fill" />
            </div>
        </div>
    )
}
