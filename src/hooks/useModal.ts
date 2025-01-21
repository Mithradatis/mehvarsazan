import { useState } from "react"; 

const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const onClose = () => {
        setIsOpen(false);
        setTitle('');
    }

    return ({
        isOpen, 
        setIsOpen,
        title,
        setTitle,
        onClose,
    })
}

export default useModal;