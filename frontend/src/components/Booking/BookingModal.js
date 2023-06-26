import { useCalendar } from "../../context/Calendar";
import { useModal } from "../../context/Modal"
import React from 'react';
const OpenCalendarModalButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const {startDate, setStartDate, endDate, setEndDate} = useCalendar()
    const  { setModalContent, setOnModalClose } = useModal()
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button className="post-review-button" onClick={onClick}><div>{itemText==='update' ? 'Update ':`Check In: ${startDate.toLocaleDateString()} CheckOut:${endDate.toLocaleDateString()}`}</div></button>
    )
}

export default OpenCalendarModalButton
