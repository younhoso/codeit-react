import React from "react";
import '../styles/index';
const RATINGS = [1, 2, 3, 4, 5];

function Star({selected = false, rating, onSelect, onHover}){
  const className = `Rating-star ${selected ? 'selected' : ''}`;
  
  const handleClick = onSelect && (() => onSelect(rating));

  const handleHover = onSelect && (() => onHover(rating));

  return <span className={className} onClick={handleClick} onMouseOver={handleHover}>★</span>;
};

function Rating({value = 0, onSelect, onHover, onMouseOut}){
  
  return (
    <div onMouseOut={onMouseOut}>
      {
        RATINGS.map((rating) => (
          <Star 
            key={rating} 
            selected={value >= rating} 
            rating={rating} 
            onSelect={onSelect} 
            onHover={onHover}
          />
        ))
      }
    </div>
  )
}

export default Rating;