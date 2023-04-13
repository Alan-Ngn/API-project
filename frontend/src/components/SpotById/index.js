import PostReviewModal from "../PostReview";
import OpenModalPostReviewButton from "../PostReview/OpenModalPostReviewButton";

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

        <div>
            <h1>{spots.name}</h1>
            <p>{`${spots.city}, ${spots.state}, ${spots.country}`}</p>
            <div>
                <img src={spots.SpotImages[0].url}></img>
                {spots.SpotImages.slice(1).map(spotImage =>
                    <img src={spotImage.url}/>
                )}
            </div>
            <div>
                {(user && user.id !== spots.ownerId && !reviewArr.map(review => review.userId).includes(user.id)) && (
                    <OpenModalPostReviewButton
                        modalComponent={<PostReviewModal spot={spots}/>}
                    />
                )}
                {reviewArr.map(review =>
                <div>

                    <h3>{review.User.firstName}</h3>
                    <h4>{review.createdAt}</h4>
                    <p>{review.review}</p>
                </div>

                    )}
            </div>
        </div>
    )

}

export default SpotById
