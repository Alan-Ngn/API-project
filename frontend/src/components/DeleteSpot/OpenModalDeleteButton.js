import { useModal } from "../../context/Modal"
import React from 'react';
const OpenModalDeleteButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const  { setModalContent, setOnModalClose } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button className="no-button" onClick={onClick}>{itemText}</button>
    )
}
 export default OpenModalDeleteButton
