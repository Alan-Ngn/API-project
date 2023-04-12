import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCurrentSpotsThunk } from "../../store/spots"
import SpotIndexItem from "../SpotsIndexItem"
const ManageSpots = () => {
    const dispatch = useDispatch()
    const getSpots = useSelector(state => state.spots)
    const sessionUser = useSelector(state => state.session.user);
    const currentSpots = Object.values(getSpots)
    useEffect(() => {
        console.log('inside Manage Spots')
        dispatch(loadCurrentSpotsThunk())
    },[dispatch])
    console.log('this is my current spots',currentSpots)
    // console.log(currentSpots.filter(spot => spot.ownerId !== sessionUser.id))
    if(getSpots.SpotImages) return null;
    if(currentSpots.filter(spot => spot.ownerId !== sessionUser.id).length >0) return null

    return (
        <section>
            {currentSpots.map((spots) => (
                <SpotIndexItem
                spot={spots}
                user={sessionUser}
                key={spots.id}
                />
            ))}
        </section>
    )

}
export default ManageSpots
