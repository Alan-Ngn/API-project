const { loadOneSpotThunk } = require("../../store/spots");

const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");



const SpotById = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots)

    // const review = useSelector(state => state.reviews)
    // console.log('SpotById spot', spots)
    // console.log('SpotByID review', review)

    useEffect(()=>{
        console.log('inside the useEffect')
        dispatch(loadOneSpotThunk(spotId))
        // dispatch(loadSpotReviewsThunk(spotId))
    },[dispatch])
    if(!Object.values(spots).length)  return null;
    // let x = spots.SpotImages[0].url
    console.log('spotImage check',spots.SpotImages[0].url)
    return (

        <div>
            <h1>{spots.name}</h1>
            <p>{`${spots.city}, ${spots.state}, ${spots.country}`}</p>
            <div>
                <img src={spots.SpotImages[0].url}></img>
            </div>
        </div>
    )

}

export default SpotById
