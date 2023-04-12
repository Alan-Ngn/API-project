import { useDispatch } from "react-redux"
import { deleteSpotThunk } from "../../store/spots"
import { useModal } from "../../context/Modal"
const DeleteSpotModal = ({spot}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const YesOnClick = (e) => {
        e.preventDefault()
        console.log('spot id to delete',spot.id)
        dispatch(deleteSpotThunk(spot.id)).then(closeModal)
        console.log('clicked delete spot')
    }
    const NoOnClick = (e) =>{
        e.preventDefault()
        closeModal()
    }
    return (
        <>
            <h1>Comfirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={YesOnClick}>Yes (Delete Spot)</button>
            <button onClick={NoOnClick}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal
