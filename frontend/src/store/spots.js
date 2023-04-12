import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS"
const LOAD_SPOT = "spots/LOAD_SPOT"
const CREATE_SPOT = 'spots/CREATE_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = "spots/DELETE_SPOT"

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

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

export const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
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

export const loadCurrentSpotsThunk = () => async(dispatch) =>{
    const response = await csrfFetch("/api/spots/current")
    if(response.ok){
        const data = await response.json()
        dispatch(loadSpots(data))
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

export const createSpotThunk = (spot, spotImg) => async(dispatch) => {

    // const spotImages = [...spot.imgArr]
    console.log('inside createSpotThunk',spotImg)
    // delete spot.imgArr;
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
        if(spotImg.length > 0) {}
        for (let i = 0; i < spotImg.length; i++) {
            const element = spotImg[i];
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

export const updateSpotThunk = (spot, spotId) => async(dispatch) => {
    console.log('inside update spot thunk',spot)
    console.log('spot Id', Number(spotId))
    delete spot.imgArr;
    spot.lat = Number(spot.lat)
    spot.lng = Number(spot.lng)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
          },
        body: JSON.stringify(spot)
    })
    if (response.ok){
        const data = await response.json()
        return data
    } else {
        return await response.json()
    }
}

export const deleteSpotThunk = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`,{
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteSpot(spotId))
        return data
    } else {
        return false
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
        // case CREATE_SPOT:
        //     newState = {}
        //     console.log(action.spot)
        //     // newState[action.spot]
        case DELETE_SPOT:
            newState = {...state}
            delete newState[action.spotId]
            return newState
        default:
            return state;
    }
}

export default spotsReducer
