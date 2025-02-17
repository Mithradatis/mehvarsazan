'use client'

import { useModal } from "@/hooks/useModal";
import ModalComponent from "@/components/Globals/ModalComponent";

const Modal = () => {
  const modalState = useModal();

  return (
    <ModalComponent>
        {
          modalState?.content || ''
        }
    </ModalComponent>
  )
}

export default Modal
