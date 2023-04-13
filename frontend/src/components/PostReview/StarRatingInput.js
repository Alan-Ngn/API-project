
import { useState } from "react";

const StarRatingInput = ({ rating, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

return (


  <div className="rating-input">
    <div
      className={activeRating >= 1 ? "filled" : "empty"}
      onMouseEnter={() => {
        setActiveRating(1);
      }}
      onMouseLeave={() => {
        setActiveRating(rating);
      }}
      onClick={() => {
        onChange(1);
      }}
    >
      <i className="fa-solid fa-star"></i>
    </div>
    <div
      className={activeRating >= 2 ? "filled" : "empty"}
      onMouseEnter={() => {
        setActiveRating(2);
      }}
      onMouseLeave={() => {
        setActiveRating(rating);
      }}
      onClick={() => {
        onChange(2);
      }}
    >
      <i className="fa-solid fa-star"></i>
    </div>
    <div
      className={activeRating >= 3 ? "filled" : "empty"}
      onMouseEnter={() => {
        setActiveRating(3);
      }}
      onMouseLeave={() => {
        setActiveRating(rating);
      }}
      onClick={() => {
        onChange(3);
      }}
    >
      <i className="fa-solid fa-star"></i>
    </div>
    <div
      className={activeRating >= 4 ? "filled" : "empty"}
      onMouseEnter={() => {
        setActiveRating(4);
      }}
      onMouseLeave={() => {
        setActiveRating(rating);
      }}
      onClick={() => {
        onChange(4);
      }}
    >
      <i className="fa-solid fa-star"></i>
    </div>
    <div
      className={activeRating >= 5 ? "filled" : "empty"}
      onMouseEnter={() => {
        setActiveRating(5);
      }}
      onMouseLeave={() => {
        setActiveRating(rating);
      }}
      onClick={() => {
        onChange(5);
      }}
    >
      <i className="fa-solid fa-star"></i>
    </div>
  </div>
);
};
export default StarRatingInput;
