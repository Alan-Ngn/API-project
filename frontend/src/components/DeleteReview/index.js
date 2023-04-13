import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotReviewThunk } from "../../store/reviews"
const DeleteReviewModal = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const YesOnClick = (e) => {
        e.preventDefault()
        console.log('review id to delete',review.id)
        dispatch(deleteSpotReviewThunk(review.id)).then(closeModal)
        console.log('clicked delete review')
    }
    const NoOnClick = (e) =>{
        e.preventDefault()
        closeModal()
    }
    return (
        <>
            <h1>Comfirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={YesOnClick}>Yes (Delete Review)</button>
            <button onClick={NoOnClick}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal
