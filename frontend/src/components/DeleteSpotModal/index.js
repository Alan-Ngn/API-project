import { useDispatch } from "react-redux"
import { deleteSpotThunk } from "../../store/spots"
import { useModal } from "../../context/Modal"
const DeleteSpotModal = ({spot}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const YesOnClick = (e) => {
        e.preventDefault()

        dispatch(deleteSpotThunk(spot.id)).then(closeModal)

    }
    const NoOnClick = (e) =>{
        e.preventDefault()
        closeModal()
    }
    return (
        <div className="modal">
            <h1>Comfirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button className="default-button" onClick={YesOnClick}>Yes (Delete Spot)</button>
            <button className="no-button" onClick={NoOnClick}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal
