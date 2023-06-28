import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { useModal } from "../../context/Modal";
import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { createBookingThunk, loadBookingBySpotThunk, updateBookingThunk } from "../../store/bookings";
import { useCalendar } from "../../context/Calendar";

function BookingForm({spot, bookedStartDate, bookedEndDate, bookingId, type}) {
	const {startDate, setStartDate, endDate, setEndDate} = useCalendar()
    const dispatch = useDispatch();
	const history = useHistory()
	// const [startDate, setStartDate] = useState("");
	// const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState('');
    const [bookingPayload, setBookingPayload] = useState({})
    let disabledDates = useSelector(state => state.bookings)
	const { closeModal } = useModal();
    let booking = {}
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [value, onChange] = useState(new Date());
    // let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;
    let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;

    if (type==='update-booking') {
        console.log(disabledDates)
        const updateDates = disabledDates.filter(date => new Date(bookedStartDate) > date || new Date(bookedEndDate) < date)
        console.log(updateDates,'did it filter out the dates?')
        disabledDates = updateDates
    }

	const handleSubmit = async (e) => {
        setErrors('')
		e.preventDefault();
        booking.startDate = value[0]
        booking.endDate = value[1]
        console.log(booking)
        if(type==='update-booking'){
            const data = await dispatch(updateBookingThunk(booking, bookingId))
			if (data) {
				setErrors(data.message);
                console.log(errors,' update creating errors')
			} else {
				closeModal();
			}
        } else {
            // const data = await dispatch(createBookingThunk(booking, spot.id))
            // if (data) {
			// 	setErrors(data.message);

			// } else {
			// 	closeModal();
			// }
            // e.preventDefault();
            // setStartDate(value[0])
            // setEndDate(value[1])
            closeModal();
        }

	};


    useEffect(() => {
        dispatch(loadBookingBySpotThunk(spot.id))
    },[dispatch])

	return (
        <div className="calendar-modal">
            {errors && <div>{errors}</div>}
            <Calendar onChange={onChange} value={value} selectRange={true} minDate={date}  tileDisabled={({date, view}) =>
                    (view === 'month') && // Block day tiles only
                    disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}/>


            <button className="default-button" onClick={handleSubmit}>{type==='update-booking' ? 'Update' : 'Close'}</button>

        </div>

	);
}

export default BookingForm;
