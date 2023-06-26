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

function BookingForm({spot, bookedStartDate, bookedEndDate, bookingId, type}) {
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
        console.log(new Date(bookedStartDate) < new Date(bookedEndDate),'booked start date')
        const updateDates = disabledDates.filter(date => new Date(bookedStartDate) < new Date(date) && new Date(bookedEndDate) < new Date(date))
        console.log(updateDates,'did it filter out the dates?')
        disabledDates = updateDates
    }
    // const tileDisabled= ()=> {

    // }
    // tileDisabled={(date, view) =>
    //     (view === 'month') && // Block day tiles only
    //     disabledDates.some(disabledDate =>
    //       date.getFullYear() === disabledDate.getFullYear() &&
    //       date.getMonth() === disabledDate.getMonth() &&
    //       date.getDate() === disabledDate.getDate()
    //   }
    // console.log(errors,' creating errors')
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
            const data = await dispatch(createBookingThunk(booking, spot.id))
            if (data) {
				setErrors(data.message);

			} else {
				closeModal();
			}
        }

        // console.log(month.toString().padStart(2,'0'))

		// if (password === confirmPassword) {

		// 	const data = await dispatch(signUp(username, email, password, firstName, lastName, admin));

		// 	if (data) {
		// 		setErrors(data);
		// 	} else {
		// 		closeModal();
		// 	}
		// } else {
		// 	setErrors([
		// 		"Password fields must match",
		// 	]);
		// }
        console.log(errors,' creating errors')
	};

	// const handleRedirect = (e) => {
	// 	e.preventDefault()
	// 	history.push(`/login`)
	//   }
    useEffect(() => {
        dispatch(loadBookingBySpotThunk(spot.id))
    },[dispatch])

	return (
        <div>
            {errors && <div>{errors}</div>}
            <Calendar onChange={onChange} value={value} selectRange={true} minDate={date} tileDisabled={({date, view}) =>
                    (view === 'month') && // Block day tiles only
                    disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}/>
            <button className="default-button" onClick={handleSubmit}>RESERVE</button>
        </div>
        // <form className="sign-up-form" onSubmit={handleSubmit}>
        //     <label>
        //         <input
        //         type="date"
        //         value={startDate}
        //         onChange={(e) => setStartDate(e.target.value)}
        //         min={today}
        //         required
        //         />
        //     </label>
        //     {/* {errors.includes('Password fields must match') && <p className="text-error">Password fields must match</p>} */}
        //     <label>
        //         <input
        //         // className={errors.includes('Password fields must match') ? 'password-error' : 'password'}
        //         type="date"
        //         value={endDate}
        //         onChange={(e) => setEndDate(e.target.value)}
        //         min={startDate}
        //         required
        //         />
        //     </label>
        //     <button className="booking-button" type="submit">Reserve</button>
        // </form>
	);
}

export default BookingForm;
