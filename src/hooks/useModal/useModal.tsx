import { useState } from "react";

const useModal = () => {

    const [ showModal, setShowModal ] = useState(false)

    const [ modalName, setModalName ] = useState('')

    function toogleModal() {
        setShowModal(!showModal)
    }

    return {
        showModal,
        toogleModal,
        modalName,
        setModalName
    }
}

export default useModal
