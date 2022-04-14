import { useRef, useState } from "react";
import Draggable from 'react-draggable'
import DraggableBar from "./DraggableBar";

import { useModal } from "@hooks/useModal";

import styles from './modal.module.scss'

const Modal = ({ modalName }) => 
{
  const { closeModal, getContent } = useModal();
  const [ isRetracted, setIsRetracted ] = useState(false);
  const [ positionDraggable, setPositionDraggable ] = useState({x:0,y:0});

  const containerRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function _onStop(e, data) {
    setPositionDraggable({x:data.x,y:data.y})
  }

  // FUNCTION RETRACT MODAL
  function retractContent() {
    const modal = containerRef.current;
    const modalContent = modal.lastChild;
    const contentHeight = modalContent.firstChild.offsetHeight;
    const x = positionDraggable.x;
    const y = positionDraggable.y;

    // reposition container
    const newY = isRetracted ? y+(contentHeight/2) : y-(contentHeight/2);
    setPositionDraggable({x:x,y:newY});

    // move content
    if (isRetracted) { // expand
      modalContent.style.height = (contentHeight+10)+'px';
      modalContent.style.visible = 'visible';
      modalContent.style.transition = '0.5s ease';
      modalContent.style.paddingBottom = '5px';
    } else { // retract
      modalContent.style.height = '0px';
      modalContent.style.visible = 'hidden';
      modalContent.style.paddingBottom = '0';
    } 

    setIsRetracted(!isRetracted);  
  }

  return (
    <Draggable nodeRef={containerRef} handle=".draggableHandle" bounds="body" position={positionDraggable} onStop={_onStop}>

      <div className={styles.draggableContainer} ref={containerRef}>

        <DraggableBar title={modalName} retractContent={retractContent} isRetracted={isRetracted} closeContainer={() => closeModal(modalName)} />

          <div className={styles.draggableContent} ref={contentRef}>
            {getContent(modalName)}
          </div>

      </div>

    </Draggable>
  )    
}

export default Modal;
