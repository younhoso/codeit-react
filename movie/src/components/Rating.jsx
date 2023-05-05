import React from "react";
import '../styles/index';
const RATINGS = [1, 2, 3, 4, 5];

function Star({selected = false}){
  const className = `Rating-star ${selected ? 'selected' : ''}`;
  return <span className={className}>★</span>;
};

function Rating({value = 0}){
  return (
    <div>
      {
        RATINGS.map((rating) => (
          <Star key={rating} selected={value >= rating} />
        ))
      }
    </div>
  )
}

export default Rating;