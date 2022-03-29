import { useRef } from "react";
import Draggable from 'react-draggable'
import DraggableBar from "./DraggableBar";

import { ForgotPassword, Login, Register } from "@components/Forms";

import styles from './modal.module.scss'

const Modal = ({ modalName, modalComponent }) => {

    const ref = useRef(null)

    return (
        <Draggable
            nodeRef={ref}
            handle="#draggableBar"
            bounds="body"
        >
            <div id="container-overlay" className={styles.container} ref={ref}>
                <DraggableBar />
                <div id="containerOverlayContent" className={styles.content}>
                    {modalName == 'login' ? <Login /> : null}
                    {modalName == 'register' ? <Register /> : null}
                    {modalName == 'forgotPassword' ? <ForgotPassword /> : null}
                    {modalComponent}
                </div>
            </div>
        </Draggable>
    )    
}

export default Modal;
