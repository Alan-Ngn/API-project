import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

export const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const loadSpotReviewsThunk = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const data = await response.json()
        dispatch(loadSpotReviews(data))
    } else {
        return false
    }
}

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newState = {}
            console.log('this is the reviews reducer', action.reviews)
            action.reviews.Reviews.forEach((review)=>{
                newState[review.id]=review;
            })
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer
