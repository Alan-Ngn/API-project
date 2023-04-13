import { useDispatch } from "react-redux"
import StarRatingInput from "./StarRatingInput"
import { useModal } from "../../context/Modal"
import { useEffect, useState } from "react"
import './StarRating.css'
const PostReviewModal = ({spot}) => {
    const dispatch = useDispatch()

    const [review, setReview] = useState('')
    const [reviewPayload, setReviewPayload] = useState({})
    const [submit, setSubmit] = useState(true)
    const { closeModal } = useModal()
    const [rating, setRating] = useState(0);
    useEffect(()=>{
        if(review.length > 10){
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    },[review])


    const onChange = (number) => {
        setRating(parseInt(number));
      };
      console.log(rating)
    const onClick = (e) => {
        e.preventDefault()
        console.log('spot id to delete',spot.id)
        // dispatch(deleteSpotThunk(spot.id)).then(closeModal)
        console.log('clicked delete spot')
    }

    return (
        <>
            <h1>How was your stay?</h1>
            <form>
                <textarea
                    id="review"
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <StarRatingInput disabled={false} onChange={onChange} rating={rating} />
                <button disabled={submit} onClick={onClick}>Submit your Review</button>
            </form>
        </>
    )
}

export default PostReviewModal
