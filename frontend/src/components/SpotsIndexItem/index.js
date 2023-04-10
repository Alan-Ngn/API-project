import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch()

    return (

            <div>
                <Link to={`/spots/${spot.id}`}>Spot Test</Link>
            </div>

    )
}

export default SpotIndexItem
