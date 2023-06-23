import DeleteReviewModal from "../DeleteReview";
import OpenModalDeleteReviewButton from "../DeleteReview/OpenModalDeleteReviewButton";
import PostReviewModal from "../PostReview";
import OpenModalPostReviewButton from "../PostReview/OpenModalPostReviewButton";
import './SpotById.css'
import '../../index.css'

import OpenCalendarModalButton from "../Booking/BookingModal";
import BookingForm from "../Booking";
const { loadOneSpotThunk } = require("../../store/spots");

const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");



const SpotById = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    // console.log('SpotById spot', spots)
    const shortMon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const user = useSelector(state => state.session.user);
    // console.log('current user',user)
    const spots = useSelector(state => state.spots)
    const reviews = useSelector(state => state.reviews)
    const reviewArr = Object.values(reviews)
    const sortedArr = reviewArr.sort((a,b)=> {
        a = new Date(a.createdAt)
        b = new Date(b.createdAt)
        return b-a
    })

    console.log('sorting the review Arr', sortedArr)
    console.log('SpotByID review', reviewArr)
    // console.log('testing arrays', reviewArr.map(review => review.userId).includes(user.id))
    useEffect(()=>{
        console.log('inside the useEffect')
        dispatch(loadOneSpotThunk(spotId))
        dispatch(loadSpotReviewsThunk(spotId))

    },[dispatch])
    console.log('this is my spots',spots)
    if(!spots.SpotImages)return null
    if(!reviews) return null
    console.log('did this work?')

    // if(!Object.values(spots).length)  return null;
    // let x = spots.SpotImages[0].url
    // console.log('spotImage check',spots.SpotImages[0].url)
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
                    {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                    <OpenCalendarModalButton
                        modalComponent={<BookingForm spot={spots} user={user}/>}
                    />
                    )}
                    <button className="reserve" onClick={()=>{
                        alert("Feature Coming Soon...");
                    }}>Reserve</button>
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
