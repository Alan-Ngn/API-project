import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS"
const LOAD_SPOT = "spots/LOAD_SPOT"
const CREATE_SPOT = 'spots/CREATE_SPOT'

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const loadOneSpot = (spot) =>{
    return {
        type: LOAD_SPOT,
        spot
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
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
    const response = await csrfFetch(`/api/spots/${spotId}`)
    console.log('loadOneSpotThunk started')
    if(response.ok){
        const data = await response.json()
        dispatch(loadOneSpot(data))
    } else {
        return false
    }
}

export const createSpotThunk = (spot) => async(dispatch) => {

    const spotImages = [...spot.imgArr]
    console.log('inside createSpotThunk',spotImages)
    delete spot.imgArr;
    spot.lat = Number(spot.lat)
    spot.lng = Number(spot.lng)
    console.log('createSpot spot', spot)
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
          },
        body: JSON.stringify(spot)
    })
    console.log('also inside createSpotThunk after deletion', response)


    if(response.ok){
        const data = await response.json()

        for (let i = 0; i < spotImages.length; i++) {
            const element = spotImages[i];
            await csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(element)
            })
        }
        // dispatch(createSpot(data))
        return data
    } else {
        return await response.json()
    }
}
const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
        newState = {}
        action.spots.Spots.forEach((spot) => {
            newState[spot.id] = spot;
          });
        return newState;
        case LOAD_SPOT:
          newState = {}
          console.log('one spot reducer')
          newState = {...action.spot}
          return newState
        case CREATE_SPOT:
            newState = {}
            console.log(action.spot)
            // newState[action.spot]
        default:
            return state;
    }
}

export default spotsReducer
