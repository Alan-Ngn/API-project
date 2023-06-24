import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import { createBookingThunk, loadBookingBySpotThunk } from "../../store/bookings";

function BookingForm({spot}) {
	const dispatch = useDispatch();
	const history = useHistory()
	// const [startDate, setStartDate] = useState("");
	// const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState([]);
    const [bookingPayload, setBookingPayload] = useState({})
    const disabledDates = useSelector(state => state.bookings)
	// const { closeModal } = useModal();
    let booking = {}
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [value, onChange] = useState(new Date());
    // let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;
    let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;

    // const tileDisabled= ()=> {

    // }
    // tileDisabled={(date, view) =>
    //     (view === 'month') && // Block day tiles only
    //     disabledDates.some(disabledDate =>
    //       date.getFullYear() === disabledDate.getFullYear() &&
    //       date.getMonth() === disabledDate.getMonth() &&
    //       date.getDate() === disabledDate.getDate()
    //   }
	const handleSubmit = async (e) => {
		e.preventDefault();
        booking.startDate = value[0]
        booking.endDate = value[1]
        console.log(booking)
        const data = await dispatch(createBookingThunk(booking, spot.id))
        

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
