import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"

const deleteSpotModal =() =>{
    const dispatch = useDispatch()
    const { closeModal } = useModal
    const handleClick = (e) => {
        e.preventDefault();
        return dispatch()
    }

    return (
        <>
        <h2>Comfirm Delete</h2>
        <p>Are you sure you want to remove this spot
        from the listings?
        </p>
        <button className="default-button" onClick={handleClick}>Yes (Delete Spot)</button>

        <button className="default-button">No (Keep Spot)</button>
        </>
    )
}
