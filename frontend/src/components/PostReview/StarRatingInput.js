
import { useEffect, useState } from "react";

const StarRatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);
  // NOTE: This useEffect isn't necessary to have for this scenario, but if you
  // have a scenario which requires this input to be re-rendered with an updated
  // rating prop instead of unmounted and remounted with an updated rating, then
  // this useEffect is necessary.

  const pawsIcon = (number) => {
    const props = {};
    if (!disabled) {
      props.onMouseEnter = () => setActiveRating(number);
      props.onMouseLeave = () => setActiveRating(rating);
      props.onClick = () => onChange(number);
    }
    return (
      <div
        key={number}
        className={activeRating >= number ? "filled" : "empty"}
        {...props}
      >
        <i className="fa-solid fa-star"></i>

      </div>
    );
  };

  return (
    <div className="rating-input">
      {[1, 2, 3, 4, 5].map((number) => pawsIcon(number))}
    </div>
  );
};

export default StarRatingInput;
