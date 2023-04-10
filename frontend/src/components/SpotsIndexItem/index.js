import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
    const dispatch = useDispatch()

    return (
        <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name}/>
            <div>
                <div>
                    {`${spot.city}, ${spot.state}`}
                </div>
                <div>
                    {`${spot.avgRating}`}
                </div>
            </div>
            <div>
                {`$${spot.price} night`}
            </div>
        </Link>
    )
}

export default SpotIndexItem
