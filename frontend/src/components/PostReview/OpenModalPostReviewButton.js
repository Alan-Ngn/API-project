import { useModal } from "../../context/Modal"
import React from 'react';
const OpenModalPostReviewButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const  { setModalContent, setOnModalClose } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button className="post-review-button" onClick={onClick}>Post your Review</button>
    )
}

export default OpenModalPostReviewButton
