import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import OpenModalDeleteButton from "../DeleteSpot/OpenModalDeleteButton";
import DeleteSpotModal from "../DeleteSpotModal";
import '../../index.css'
import './SpotIndexItem.css'
import OpenCalendarModalButton from "../Booking/BookingModal";
import BookingForm from "../Booking";
import { deleteBookingThunk } from "../../store/bookings";
import { useDispatch } from "react-redux";
// import "./LoginForm.css";
const SpotIndexItem = ({ spot, user, type, booking }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const handleDelete = async(e) => {
        e.preventDefault()
        dispatch(deleteBookingThunk(booking.id))
    }
    // const closeMenu = () => setShowMenu(false);
    return (
        <div className="spotItem" img-tooltip={spot.name}>
            <Link to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="spotImg" img-tooltip={spot.name}>
                    <img className="spotIndexImg" src={spot.previewImage} alt={spot.name} img-tooltip={spot.name}/>
                </div>
                <div className="cityStateRating">
                    <div>
                        {`${spot.city}, ${spot.state}`}
                    </div>
                    <div>
                    <i className="fa-solid fa-star"></i>{spot.avgRating > 0 ? Number(spot.avgRating).toFixed(1) : 'New'}
                    </div>
                </div>
                <div>
                    {`$${spot.price} night`}
                </div>
            </Link>
            {type==='ManageBookings' && (
                <div>{`${booking.startDate} to ${booking.endDate}`}</div>
                )}
            {user && type && type !=='ManageBookings' &&(
                <div>
                    <button className="update-spot-button" spot={spot} onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                    <OpenModalDeleteButton //click a button generated from OpenModalDeleteButton
                        itemText="Delete"

                        modalComponent={<DeleteSpotModal spot={spot}/>} //onclick it will open the delete comfirmation modal
                        // onItemClick={closeMenu}
                    />
                        {/* <button>Delete</button> */}
                </div>
            )}
            {type==='ManageBookings' && (
                <div>
                    <OpenCalendarModalButton
                        modalComponent={<BookingForm spot={spot} user={user}/>}
                    />
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default SpotIndexItem
