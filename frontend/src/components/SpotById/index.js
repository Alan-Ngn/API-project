import DeleteReviewModal from "../DeleteReview";
import OpenModalDeleteReviewButton from "../DeleteReview/OpenModalDeleteReviewButton";
import PostReviewModal from "../PostReview";
import OpenModalPostReviewButton from "../PostReview/OpenModalPostReviewButton";
import './SpotById.css'
import '../../index.css'

import OpenCalendarModalButton from "../Booking/BookingModal";
import BookingForm from "../Booking";
import { createBookingThunk, updateBookingThunk } from "../../store/bookings";
import { useCalendar } from "../../context/Calendar";
const { loadOneSpotThunk } = require("../../store/spots");

const { useEffect, useState } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");



const SpotById = () => {
    const {startDate, setStartDate, endDate, setEndDate} = useCalendar()
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const [errors, setErrors] = useState('');

    const shortMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const user = useSelector(state => state.session.user);

    let booking = {}
    const spots = useSelector(state => state.spots)
    const reviews = useSelector(state => state.reviews)
    const reviewArr = Object.values(reviews)
    const sortedArr = reviewArr.sort((a,b)=> {
        a = new Date(a.createdAt)
        b = new Date(b.createdAt)
        return b-a
    })


	const handleSubmit = async (e) => {
        setErrors('')
		e.preventDefault();
        booking.startDate = startDate
        booking.endDate = endDate
        const data = await dispatch(createBookingThunk(booking, spotId))

        if (data) {
            setErrors(data.errors.endDate);
        } else {
            alert("Spot Booked!");
        }
        // else {
        //     setStartDate(new Date())
        //     setEndDate(new Date())
        // }

	};




    useEffect(()=>{

        dispatch(loadOneSpotThunk(spotId))
        dispatch(loadSpotReviewsThunk(spotId))

    },[dispatch])

    if(!spots.SpotImages)return null
    if(!reviews) return null


    // if(!Object.values(spots).length)  return null;
    // let x = spots.SpotImages[0].url

    return (

        <div className="spotDetails">
            <h1>{spots.name}</h1>
            <p>{`${spots.city}, ${spots.state}, ${spots.country}`}</p>
            <div className="spotByIdImg">
                <img className="spotByIdLarge" src={spots.SpotImages[0].url}></img>
                <div className="spotByIdSmall">
                    {spots.SpotImages.slice(1).map(spotImage =>
                        <img className="singleSpotByIdSmall" src={spotImage.url}/>
                    )}
                </div>
            </div>
            <div className="mid-section">
                <div className="summary">
                    <h1>{`Hosted by ${spots.Owner.firstName} ${spots.Owner.lastName}`}</h1>
                    <p>{spots.description}</p>
                </div>
                <div className="pricing-reservation">
                    <div className="price-rating">
                        <div className="price-night">
                            <h2>{`$${spots.price}`}</h2>
                            <h3>night</h3>
                            {/* {`$${spots.price} night`} */}
                        </div>
                        <div className="rating-count">
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {` ${spots.avgRating > 0 ? Number(spots.avgRating).toFixed(1) : 'New'}`}
                            </div>
                            <div>
                                {`${spots.numReviews === 0 ? '' : '·'}`}
                            </div>
                            <div>
                                {`${spots.numReviews === 0 ? '' : spots.numReviews} ${spots.numReviews > 1 ? 'Reviews' : spots.numReviews === 0 ? '' : 'Review'}`}
                            </div>
                        </div>
                    </div>
                    {errors && <div>{errors}</div>}
                    {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                    <div className="calender-pricing">

                        <OpenCalendarModalButton
                            modalComponent={<BookingForm spot={spots} user={user}/>}
                        />
                            {startDate !=='' && endDate !=='' && Math.round((endDate.getTime()-startDate.getTime())/(1000 * 3600 * 24))-1 !== -1 &&
                            <div className="pricing-total">

                            <div>{`$${spots.price} X ${Math.round((endDate.getTime()-startDate.getTime())/(1000 * 3600 * 24))-1} nights`}</div>
                            <div>{`$${spots.price * (Math.round((endDate.getTime()-startDate.getTime())/(1000 * 3600 * 24))-1)}`}</div>
                        </div>
                            }
                    </div>
                    )}
                    {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                        <button className="reserve" onClick={handleSubmit}>Reserve</button>
                    )}
                </div>
            </div>

            <div className="rating-count-second">
                <div>
                    <i className="fa-solid fa-star"></i>
                    {` ${spots.avgRating > 0 ? Number(spots.avgRating).toFixed(1) : 'New'}`}
                </div>
                <div>
                    {`${spots.numReviews === 0 ? '' : '·'}`}
                </div>
                <div>
                    {`${spots.numReviews === 0 ? '' : spots.numReviews} ${spots.numReviews > 1 ? 'Reviews' : spots.numReviews === 0 ? '' : 'Review'}`}
                </div>
            </div>
            <div>
            {(user && user.id !== spots.ownerId && reviewArr.length === 0) && (
                <div>Be the first to post a review!</div>
            )}
                {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                    <OpenModalPostReviewButton
                        modalComponent={<PostReviewModal spot={spots} user={user}/>}
                    />
                )}
                {sortedArr.map(review =>
                <div className="individual-review">
                    <h3>{review.User.firstName}</h3>
                    <h4>{`${month[shortMon.indexOf(Date(review.createdAt).split(' ')[1])]} ${Date(review.createdAt).split(' ')[3]}`}</h4>
                    <p>{review.review}</p>
                    {(user && user.id === review.User.id) && (
                        <OpenModalDeleteReviewButton
                            modalComponent={<DeleteReviewModal spot={spots} review={review}/>}
                        />
                    )}
                </div>

                    )}
            </div>
        </div>
    )

}

export default SpotById
