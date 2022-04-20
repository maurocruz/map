import { IconArrowEject, IconCloseFill, IconDraggableDots } from '@components/Icons';

import styles from './modal.module.scss'

export default function DraggableBar({title, retractContent, closeContainer, isRetracted}) 
{

  function grabbing(e) {
    e.currentTarget.style.cursor = 'grabbing';
  }

  function grab(e) {
    e.currentTarget.style.cursor = 'grab';
  }

  return(
    <div className={`draggableHandle ${styles.draggableBar}`}>            
      <div className={styles.draggableMove} onMouseDown={grabbing} onTouchStart={grabbing} onMouseUp={grab} onTouchEnd={grab}>
        <IconDraggableDots color={'white'} width={'1.3em'} />
      </div>
      <div className={styles.draggableTitle} onDoubleClick={retractContent} onMouseDown={grabbing} onTouchStart={grabbing} onMouseUp={grab} onTouchEnd={grab}>{title}</div>
      <div className={styles.draggableBarButtons}>
        <button className={styles.draggableBarRetracter} onClick={retractContent} onTouchEnd={retractContent}>
            {isRetracted 
              ? <IconArrowEject color="white" width={'1.3em'} rotate={2} /> 
              : <IconArrowEject color="white" width={'1.3em'} />
            }
        </button>
        <button className={styles.draggableBarClose} onClick={closeContainer} onTouchEnd={closeContainer}>
          <IconCloseFill color={'white'} width={'1.5em'} />
        </button>
      </div>
    </div>
  )
}
