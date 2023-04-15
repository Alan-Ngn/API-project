import { csrfFetch } from "./csrf";
import { loadOneSpotThunk } from "./spots";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'


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

export const deleteSpotReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
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
    }).catch(async(err) => {
        // console.log('inside thunk err', await err.json())
        return await err.json()
    })
    console.log('what is my response', response)
    if(response.ok){
        console.log('testing response ok')
        const data = await response.json()
        // dispatch(createSpotReview(data))
        console.log(data)
        dispatch(loadSpotReviewsThunk(spotId))
        dispatch(loadOneSpotThunk(spotId))

        return data
    } else {
       console.log('testing response not ok')
        return response
    }
}

export const deleteSpotReviewThunk = (reviewId, spotId) => async(dispatch) =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: "DELETE"
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteSpotReview(reviewId))
        dispatch(loadOneSpotThunk(spotId))
        return data
    } else {
        return false
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
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer
