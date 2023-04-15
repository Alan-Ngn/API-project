import DeleteReviewModal from "../DeleteReview";
import OpenModalDeleteReviewButton from "../DeleteReview/OpenModalDeleteReviewButton";
import PostReviewModal from "../PostReview";
import OpenModalPostReviewButton from "../PostReview/OpenModalPostReviewButton";
import './SpotById.css'
const { loadOneSpotThunk } = require("../../store/spots");

const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");



const SpotById = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    // console.log('SpotById spot', spots)
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
                <div>
                    <h1>{`Hosted by ${spots.Owner.firstName} ${spots.Owner.lastName}`}</h1>
                    <p>{spots.description}</p>
                </div>
                <div className="pricing-reservation">
                    <div className="price-rating">
                        <div>{`$${spots.price.toFixed(2)} night`}</div>

                        <div><i className="fa-solid fa-star"></i>{`${spots.avgRating.toFixed(1)} ${spots.numReviews} Reviews`}</div>
                    </div>
                    <button className="reserve" onClick={()=>{
                        alert("Feature Coming Soon...");
                    }}>Reserve</button>
                </div>
            </div>
            <i className="fa-solid fa-star"></i>
            <div>{`${spots.avgRating.toFixed(1)} ${spots.numReviews} Reviews`}</div>
            <div>
                {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                    <OpenModalPostReviewButton
                        modalComponent={<PostReviewModal spot={spots} user={user}/>}
                    />
                )}
                {sortedArr.map(review =>
                <div>
                    <h3>{review.User.firstName}</h3>
                    <h4>{`${Date(review.createdAt).split(' ')[1]} ${Date(review.createdAt).split(' ')[3]}`}</h4>
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
