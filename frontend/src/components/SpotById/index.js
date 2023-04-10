const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const { loadSpotReviewsThunk } = require("../../store/reviews");


const SpotById = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots)[spotId]
    const spot = {...spots}
    const review = useSelector(state => state.reviews)
    console.log('SpotById spot', spot)
    console.log('SpotByID review', review)
    useEffect(()=>{
        dispatch(loadSpotReviewsThunk(spotId))
    },[dispatch])
    if(!spot) return null;
    return (
        <div>

        </div>
    )

}

export default SpotById
