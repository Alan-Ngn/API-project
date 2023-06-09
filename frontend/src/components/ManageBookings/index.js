import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCurrentBookedSpotsThunk, loadCurrentSpotsThunk } from "../../store/spots"
import SpotIndexItem from "../SpotsIndexItem"
import { Link, useHistory } from "react-router-dom"
const ManageBookings = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const getSpots = useSelector(state => state.spots)
    const sessionUser = useSelector(state => state.session.user);
    const currentSpots = Object.values(getSpots)
    useEffect(() => {

        dispatch(loadCurrentBookedSpotsThunk())
    },[dispatch])


    const pastBookings =currentSpots.filter(spot => new Date(spot.endDate) < new Date())
    const upcomingBookings = currentSpots.filter(spot => new Date(spot.startDate) > new Date())
    const currentbookings = currentSpots.filter(spot => new Date(spot.startDate) <= new Date() && new Date(spot.endDate) >= new Date())
    if(currentSpots.length ===0 || !currentSpots[0].startDate ) return null
    if(getSpots.SpotImages) return null;
    // if(currentSpots.filter(spot => spot.ownerId !== sessionUser.id).length >0) return null

    return (
        <>
            <h1>Manage Bookings</h1>
            <h2>Current Trips</h2>
            <section className="spotIndexItems">
                {currentbookings.map((spots) => (
                    <SpotIndexItem
                    spot={spots.Spot}
                    type={'ManageBookings'}
                    user={sessionUser}
                    key={spots.Spot.id}
                    booking={spots}
                    />
                ))}
            </section>
            <h2>Upcoming Trips</h2>
            <section className="spotIndexItems">
                {upcomingBookings.map((spots) => (
                    <SpotIndexItem
                    spot={spots.Spot}
                    type={'ManageBookings'}
                    user={sessionUser}
                    key={spots.Spot.id}
                    booking={spots}
                    />
                ))}
            </section>
            <h2>Past Trips</h2>
            <section className="spotIndexItems">
                {pastBookings.map((spots) => (
                    <SpotIndexItem
                    spot={spots.Spot}
                    type={'ManageBookings'}
                    user={sessionUser}
                    key={spots.Spot.id}
                    booking={spots}
                    />
                ))}
            </section>
        </>
    )

}
export default ManageBookings
