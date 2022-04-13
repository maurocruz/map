import { ContainerContext } from "@contexts/ContainerContext";
import { useContext } from "react";

import { UserEdit, UserLogin, UserRegister } from "@components/User";
import { PlaceFavotites } from "@components/Place";
import { ForgotPassword } from "@components/Forms";


export type OpenededModals = {
  login?: boolean
}

const useModal = () => {

  const { openedModals, setOpenedModals } = useContext(ContainerContext);

  function createObject() {
    const obj = new Object();
    Object.entries(openedModals).forEach((value) => {
      obj[value[0]] = value[1];
    })
    return obj;
  }

  function openModal(nameModal: string) {
    const obj = new Object();
    Object.entries(openedModals).forEach((value) => {
      obj[value[0]] = value[1];
    })

    obj[nameModal] = true;
    console.log(obj);    
    setOpenedModals(obj);
  }

  function closeModal(nameModal: string) {
    const obj = createObject();
    obj[nameModal] = false;
    setOpenedModals(obj);
  }
    
  function getContent(name: string) {
    switch(name) {
      case 'login': return <UserLogin />;
      case 'register': return <UserRegister/>;
      case 'forgotPassword': return <ForgotPassword/>;
      case 'userEdit': return <UserEdit/>;
      case 'PlaceFavorites': return <PlaceFavotites/>;
    }
  }

  return {
    openModal,
    closeModal,
    getContent,
    openedModals,
    setOpenedModals
  }
}

export default useModal
