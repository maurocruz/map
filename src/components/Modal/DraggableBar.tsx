import { Icon } from '@iconify/react';
import { useContext } from 'react';
import { ContainerContext } from 'src/contexts';

import styles from './modal.module.scss'

export default function DraggableBar() {

    const { toogleModal } = useContext(ContainerContext)

    function _close() {
        toogleModal(false)
    }

    return(
        <div id='draggableBar' className={styles.draggableClose}>            
            <div id="draggable" className={styles.draggable}>
                <Icon icon="uil:draggabledots" />
            </div>
            <div id="close" className={styles.close} onClick={_close}>
                <Icon icon="eva:close-fill" />
            </div>
        </div>
    )
}