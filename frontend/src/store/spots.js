import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS"

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const loadSpotsThunk = () => async(dispatch) => {
    const response = await csrfFetch("/api/spots")
    console.log('loadSpotsThunk started')
    if(response.ok){
        const data = await response.json()
        dispatch(loadSpots(data))
        // return data
    } else {
        return false
    }
}

export const loadOneSpotThunk = (spotId) => async(dispatch) => {
    const response = await csrfFetch('/api/spots/:spotId')
}


const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
        newState = {}
        let x = action.spots
        console.log('this is the action',x.Spots)
        action.spots.Spots.forEach((spot) => {
            newState[spot.id] = spot;
          });

        return newState;
        default:
            return state;
    }
}

export default spotsReducer
