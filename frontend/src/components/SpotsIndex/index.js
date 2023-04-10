import SpotIndexItem from '../SpotsIndexItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';
const SpotsIndex = () => {
    const dispatch = useDispatch()
    console.log('inside SpotsIndex')
    const getSpots = useSelector(state => state.spots)
    console.log('getSpots->', getSpots)
    const spots = Object.values(getSpots)
    useEffect(() => {
        dispatch(loadSpotsThunk())
    },[dispatch])

    if(!spots.length) return null;

    return (
        <section>
            {spots.map((spots) => (
                <SpotIndexItem
                spot={spots}
                key={spots.id}
                />
            ))}
        </section>
    )
}
 export default SpotsIndex
