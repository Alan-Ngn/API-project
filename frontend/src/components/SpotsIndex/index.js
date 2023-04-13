import SpotIndexItem from '../SpotsIndexItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';
import './SpotIndex.css'
const SpotsIndex = () => {
    const dispatch = useDispatch()
    console.log('inside SpotsIndex')
    const sessionUser = useSelector(state => state.session.user);
    const getSpots = useSelector(state => state.spots)
    console.log('getSpots->', getSpots)
    const spots = Object.values(getSpots)
    useEffect(() => {
        dispatch(loadSpotsThunk())
    },[dispatch])
    console.log(sessionUser)
    if(getSpots.SpotImages) return null;
    if(sessionUser && spots.filter(spot => spot.ownerId === sessionUser.id).length === spots.length) return null
    return (
        <section className="spotIndexItems">
            {spots.map((spots) => (
                <SpotIndexItem
                spot={spots}
                user={sessionUser}
                key={spots.id}
                />
            ))}
        </section>
    )
}
 export default SpotsIndex
