import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
export const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const createSpotReview = (review) =>{
    return {
        type: CREATE_REVIEW,
        review
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

export const createSpotReviewThunk = (review, spotId, userFirstName) => async(dispatch) => {
    console.log('inside the create review Thunk')
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
          },
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json()
        const User = {}
        User.firstName = userFirstName
        const payload ={...data, User}


        dispatch(createSpotReview(payload))
        return data
    } else {
        return await response.json()
    }
}
const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
        const newState = {}
        console.log('this is the reviews reducer', action.reviews)
        action.reviews.Reviews.forEach((review)=>{
            newState[review.id]=review;
        })
        return newState;
        }
        case CREATE_REVIEW: {
            console.log('create Review Reducer',action.review)
            const newState ={...state}
            newState[action.review.id]=action.review
            return newState

        }
        default:
            return state;
    }
}

export default reviewsReducer
