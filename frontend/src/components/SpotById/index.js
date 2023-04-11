const { loadOneSpotThunk } = require("../../store/spots");

const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");



const SpotById = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    // const review = useSelector(state => state.reviews)
    // console.log('SpotById spot', spots)
    // console.log('SpotByID review', review)

    const spots = useSelector(state => state.spots)
    useEffect(()=>{
        console.log('inside the useEffect')
        dispatch(loadOneSpotThunk(spotId))
        // dispatch(loadSpotReviewsThunk(spotId))
    },[dispatch])
    console.log('this is my spots',spots)
    if(!spots.SpotImages)return null
    console.log('did this work?')

    // if(!Object.values(spots).length)  return null;
    // let x = spots.SpotImages[0].url
    // console.log('spotImage check',spots.SpotImages[0].url)
    return (

        <div>
            <h1>{spots.name}</h1>
            <p>{`${spots.city}, ${spots.state}, ${spots.country}`}</p>
            <div>
                {spots.SpotImages.slice(1).map(spotImage =>
                    <img src={spotImage.url}/>
                )}
                <img src={spots.SpotImages[0].url}></img>
            </div>
        </div>
    )

}

export default SpotById
