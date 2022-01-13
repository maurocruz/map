import { Modal } from "@components/Modal";
import Header from "@components/Header/Header";
import { createContext } from "react";
import useModal from "src/hooks/useModal/useModal";

type ContainerContextType = {
    showModal: boolean,
    toogleModal: Function,
    modalName: string,
    setModalName: Function
}

const ContainerContext = createContext({} as ContainerContextType)

const ContainerProvider = () => {

    const { showModal, toogleModal, modalName, setModalName } = useModal()

    return (
        <ContainerContext.Provider value={{ showModal, toogleModal, modalName, setModalName }}>
            <Header/>
            <Modal showModal={showModal} modalName={modalName} />             
        </ContainerContext.Provider>
    )
}

export { ContainerContext, ContainerProvider }
