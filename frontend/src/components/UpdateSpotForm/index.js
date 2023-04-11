import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadOneSpotThunk } from "../../store/spots"

const UpdateSpotForm = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    useEffect(()=>{
        console.log('inside the useEffect')
        dispatch(loadOneSpotThunk(spotId))
        // dispatch(loadSpotReviewsThunk(spotId))
    },[dispatch])
    if(!spots.SpotImages)return null
}
export default UpdateSpotForm
