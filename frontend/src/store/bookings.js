import { csrfFetch } from "./csrf";
import { loadCurrentBookedSpotsThunk } from "./spots";


const LOAD_BOOKING = "bookings/LOAD_BOOKING"



export const loadBookingBySpot = (bookings) =>{
    return {
        type: LOAD_BOOKING,
        bookings
    }
}




export const loadBookingBySpotThunk = (spotId) => async(dispatch) =>{
    console.log('did we get to the bookijng thunk')
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if(response.ok){
        const data = await response.json()
        dispatch(loadBookingBySpot(data))
    } else {
        return false
    }
}

export const createBookingThunk = (booking, spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
          },
        body: JSON.stringify(booking)
    })
    if(response.ok){
        const data = await response.json()
        return data
    } else {
        return false
    }
}

export const deleteBookingThunk = (bookingId) => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json()
        dispatch(loadCurrentBookedSpotsThunk())
        return data
    } else {
        return false
    }
}

const bookingsReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case LOAD_BOOKING:
        newState = []
        action.bookings.Bookings.forEach((booking) => {

            for (let i = new Date(booking.startDate); i <= new Date(booking.endDate); new Date(i.setDate(i.getDate()+1))) {
                newState.push(new Date(i))

            }
          });
        return newState;
        default:
            return state;
    }
}

export default bookingsReducer
