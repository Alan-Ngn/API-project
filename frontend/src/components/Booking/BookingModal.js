import { useCalendar } from "../../context/Calendar";
import { useModal } from "../../context/Modal"
import React from 'react';
import './Calendar.css'
const OpenCalendarModalButton = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const {startDate, setStartDate, endDate, setEndDate} = useCalendar()
    const  { setModalContent, setOnModalClose } = useModal()
    const ClassName = "calendar-button" + ( itemText!=='update'? "" : "-update");
    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent)
        if(onItemClick) onItemClick()
    }
    return (
        <button className={ClassName} onClick={onClick}>
        {
            itemText==='update' ? 'Update ':
            <div className="calendar-reservation">
                <div className="calendar-check-in">
                    <div>CHECK-IN</div><div>{startDate !=='' ? startDate.toLocaleDateString() : startDate}</div>
                </div>
                <div className="calendar-check-out">
                    <div>CHECKOUT</div><div>{endDate !=='' ? endDate.toLocaleDateString() : endDate}</div>
                </div>
            </div>
            // `Check In: ${startDate.toLocaleDateString()} CheckOut:${endDate.toLocaleDateString()}`
        }
        </button>
    )
}

export default OpenCalendarModalButton
