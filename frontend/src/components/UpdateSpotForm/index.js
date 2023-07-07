import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadOneSpotThunk } from "../../store/spots"
import SpotForm from "../SpotForm"
const UpdateSpotForm = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    useEffect(()=>{

        dispatch(loadOneSpotThunk(spotId))
        // dispatch(loadSpotReviewsThunk(spotId))
    },[dispatch])
    if(!spots.SpotImages)return null
    // const imgObj ={}
    // for (let i = 0; i < spots.SpotImages.length; i++) {
    //     const element = spots.SpotImages[i];
    //     imgObj[element.id] = element.url
    // }

    const input = {
        country: spots.country,
        address: spots.address,
        city: spots.city,
        state: spots.state,
        lat: spots.lat,
        lng: spots.lng,
        description: spots.description,
        name: spots.name,
        price: spots.price,
        previewImage: "",
        optImgOne: "",
        optImgTwo: "",
        optImgThree: "",
        optImgFour: ""
    }
    return (
        <SpotForm input={input} formType="Update your Spot"/>
    )
}
export default UpdateSpotForm
