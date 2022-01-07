import { useContext, useRef } from "react";
import Draggable from 'react-draggable'
import { ContainerContext } from "src/contexts";
import DraggableBar from "./DraggableBar";

import styles from './containerOverlay.module.scss'

const ContainerOverlay = ({ children }) => {

    const { setIsVisible } = useContext(ContainerContext)

    const ref = useRef(null)

    const css = children ? { display: 'block' } : {}

    function _onClick(e) {
        e.stopPropagation()
    }

    function _onMouseDown(e: MouseEvent) {
    }

    if(ref.current) {
        window.addEventListener('click', function(e: MouseEvent) {
            setIsVisible(false)
        })
    }

    return (
        <Draggable
            nodeRef={ref}
            handle="#draggableBar"
            bounds="body"
            onMouseDown={_onMouseDown}
        >
            <div id="container-overlay" className={styles.container} ref={ref} style={css} onClick={(e) => _onClick(e)}>
                <DraggableBar />
                <div id="containerOverlayContent" className={styles.content}>
                    {children}
                </div>
            </div>
        </Draggable>
    )    
}

export default ContainerOverlay;
