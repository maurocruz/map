import { useRef } from "react";
import Draggable from 'react-draggable'
import DraggableBar from "./DraggableBar";

import styles from './modal.module.scss'
import useModal from "@hooks/useModal/useModal";

const Modal = ({ modalName }) => 
{
  const { closeModal, getContent } = useModal();

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const idHandle = 'draggableContaine_'+modalName.replace(' ','');

  // FUNCTION RETRACT MODAL
  function retractContent() {
    if (contentRef.current.style.display === 'none') {
      contentRef.current.style.display = 'block';
    } else {
      contentRef.current.style.display = 'none';
    }
  }

  return (
    <Draggable nodeRef={containerRef} handle=".draggableHandle" bounds="body">

      <div className={`draggableHandle ${styles.draggableContainer}`} ref={containerRef}>

        <DraggableBar title={modalName} retractContent={retractContent} closeContainer={() => closeModal(modalName)} />

          <div className={styles.draggableContent} ref={contentRef}>
            {getContent(modalName)}
          </div>

      </div>

    </Draggable>
  )    
}

export default Modal;
