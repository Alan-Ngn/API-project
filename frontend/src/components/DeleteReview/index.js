import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotReviewThunk } from "../../store/reviews"
import './DeleteReview.css'
const DeleteReviewModal = ({review, spot}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const YesOnClick = (e) => {
        e.preventDefault()

        dispatch(deleteSpotReviewThunk(review.id, spot.id)).then(closeModal)

    }
    const NoOnClick = (e) =>{
        e.preventDefault()
        closeModal()
    }
    return (
        <div className="modal">
            <h1>Comfirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button className="default-button" onClick={YesOnClick}>Yes (Delete Review)</button>
            <button className="no-button" onClick={NoOnClick}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal
