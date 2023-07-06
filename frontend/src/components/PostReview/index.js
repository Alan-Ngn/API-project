import { useDispatch } from "react-redux"
import StarRatingInput from "./StarRatingInput"
import { useModal } from "../../context/Modal"
import { useEffect, useState } from "react"
import './StarRating.css'
import { createSpotReviewThunk, loadSpotReviewsThunk } from "../../store/reviews"

const PostReviewModal = ({spot, user}) => {
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [reviewPayload, setReviewPayload] = useState({})
    const [submit, setSubmit] = useState(true)
    const { closeModal } = useModal()
    const [rating, setRating] = useState(0);
    const [backendErr, setBackendErr] = useState({})
    const reviewObj = {}
    useEffect(()=>{
        if(review || rating > 0){
            setSubmit(false)
        } else {
            setSubmit(true)
        }
        reviewObj.review = review
        reviewObj.stars = rating
        setReviewPayload(reviewObj)
        console.log('my payload',reviewObj)
    },[review, rating])


    const onChange = (number) => {
        setRating(parseInt(number));
      };
      console.log(rating)
    const onClick = async(e) => {
        e.preventDefault()
        console.log('spot id to create review',spot.id)
        // dispatch(createSpotReviewThunk(reviewPayload,spot.id, user.firstName)).then(closeModal)
        // dispatch(createSpotReviewThunk(reviewPayload,spot.id)).then(dispatch(loadSpotReviewsThunk(spot.id))).then(closeModal)
        const backendError = await dispatch(createSpotReviewThunk(reviewPayload,spot.id)).then(function(result) {
            if(result.errors) {
                return result
            } else {
                return closeModal()
            };
          });
        console.log('testing response frontend for backend',backendError.errors.review)
        setBackendErr(backendError.errors)
        console.log('object or array',Object.values(backendErr).length)
        if(Object.values(backendErr).length===0){
            console.log('close modal?')


        }
    }

    return (
        <div className="modal">
            <h1>How was your stay?</h1>
            <p className="errors">{backendErr.review}</p>
            <p className="errors">{backendErr.stars}</p>
            <form onSubmit={onClick}>
                <textarea
                    id="review"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <StarRatingInput onChange={onChange} rating={rating} />
                <button className="default-button" disabled={submit}>Submit your Review</button>
            </form>
        </div>
    )
}

export default PostReviewModal
