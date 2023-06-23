import { useModal } from "../../context/Modal"
import React from 'react';
const OpenCalendarModalButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const  { setModalContent, setOnModalClose } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button className="post-review-button" onClick={onClick}>Calendar</button>
    )
}

export default OpenCalendarModalButton
