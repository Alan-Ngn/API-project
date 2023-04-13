import { useModal } from "../../context/Modal"
import React from 'react';
const OpenModalDeleteReviewButton = ({modalComponent, onItemClick, onModalClose}) => {
    const  { setModalContent, setOnModalClose } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button onClick={onClick}>Delete</button>
    )
}
 export default OpenModalDeleteReviewButton
