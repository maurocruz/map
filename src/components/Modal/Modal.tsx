import { useRef } from "react";
import Draggable from 'react-draggable'
import DraggableBar from "./DraggableBar";

import { ForgotPassword, Login, Register } from "@components/Forms";

import styles from './modal.module.scss'

const Modal = ({ showModal, modalName }) => {

    const ref = useRef(null)

    const css = showModal ? { display: 'block' } : {}

    function _onClick(e) {
        e.stopPropagation()
    }

    return (
        <Draggable
            nodeRef={ref}
            handle="#draggableBar"
            bounds="body"
        >
            <div id="container-overlay" className={styles.container} ref={ref} style={css} onClick={(e) => _onClick(e)}>
                <DraggableBar />
                <div id="containerOverlayContent" className={styles.content}>
                    {modalName == 'login' ? <Login /> : null}
                    {modalName == 'register' ? <Register /> : null}
                    {modalName == 'forgotPassword' ? <ForgotPassword /> : null}
                </div>
            </div>
        </Draggable>
    )    
}

export default Modal;
