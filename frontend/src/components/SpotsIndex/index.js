import SpotIndexItem from '../SpotsIndexItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';
import './SpotIndex.css'
import { useSearch } from '../../context/Search';
import { useLocation } from "react-router-dom";

const SpotsIndex = () => {
    const dispatch = useDispatch()
    const {search, setSearch} = useSearch()
    const [spotsArr, setSpotsArr] = useState([])
    console.log('inside SpotsIndex')
    const sessionUser = useSelector(state => state.session.user);
    const getSpots = useSelector(state => state.spots)
    const spots = Object.values(getSpots)
    console.log('getSpots->', spots)
    const location = useLocation()

    useEffect(() => {
        setSearch('')
        dispatch(loadSpotsThunk())
    },[dispatch])
    useEffect(()=>{
        console.log(spots,'spot checking!!!!!')
        if(!spots && !getSpots.SpotImages){

            let filteredSearch = spots.filter(spot => spot.name.toLowerCase().includes(search))
            setSpotsArr(filteredSearch)
            console.log(filteredSearch)
        }
      },[search])
    console.log(sessionUser)

    if(getSpots.SpotImages) return null;
    if(sessionUser && spots.filter(spot => spot.ownerId === sessionUser.id).length === spots.length) return null

    return (
        <>
        {search ?
        (
        <section className="spotIndexItems">
            {spotsArr.map((spots) => (
                <SpotIndexItem
                spot={spots}
                user={sessionUser}
                key={spots.id}
                />
            ))}
        </section>) : (
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
        </>
    )
}
 export default SpotsIndex
