import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const SpotIndexItem = ({ spot, user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    return (
        <div>
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
            {user && (
                <div>
                    <button spot={spot} onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                    <button>Delete</button>
                </div>
            )}
        </div>
    )
}

export default SpotIndexItem
