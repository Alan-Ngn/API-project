import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import OpenModalDeleteButton from "../DeleteSpot/OpenModalDeleteButton";
import DeleteSpotModal from "../DeleteSpotModal";
import '../../index.css'
import './SpotIndexItem.css'
// import "./LoginForm.css";
const SpotIndexItem = ({ spot, user, type }) => {

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

    // const closeMenu = () => setShowMenu(false);
    return (
        <div className="spotItem" img-tooltip={spot.name}>
            <Link to={`/spots/${spot.id}`}>
                <div className="spotImg" img-tooltip={spot.name}>
                    <img src={spot.previewImage} alt={spot.name} img-tooltip={spot.name}/>
                </div>
                <div>
                    <div>
                        {`${spot.city}, ${spot.state}`}
                    </div>
                    <div>
                        {`${spot.avgRating}`}
                    </div>
                </div>
                <div>
                    {`$${spot.price} night`}
                </div>
            </Link>
            {user && type && (
                <div>
                    <button spot={spot} onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                    <OpenModalDeleteButton //click a button generated from OpenModalDeleteButton
                        itemText="Delete"

                        modalComponent={<DeleteSpotModal spot={spot}/>} //onclick it will open the delete comfirmation modal
                        // onItemClick={closeMenu}
                    />
                        {/* <button>Delete</button> */}
                </div>
            )}
        </div>
    )
}

export default SpotIndexItem
