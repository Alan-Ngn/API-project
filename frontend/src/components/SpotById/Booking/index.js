import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import { useModal } from "../../context/Modal";
// import { signUp } from "../../store/session";
// import "./SignupForm.css";

function BookingForm() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [errors, setErrors] = useState([]);
	// const { closeModal } = useModal();
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = `${year}-${month.toString().padStart(2,'0')}-${day}`;

	const handleSubmit = async (e) => {
		e.preventDefault();
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

	return (
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <label>
                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
                required
                />
            </label>
            {/* {errors.includes('Password fields must match') && <p className="text-error">Password fields must match</p>} */}
            <label>
                <input
                // className={errors.includes('Password fields must match') ? 'password-error' : 'password'}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                required
                />
            </label>
            <button className="booking-button" type="submit">Reserve</button>
        </form>
	);
}

export default BookingForm;
