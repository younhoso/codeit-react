import React, { useState } from "react";

function ReviewForm() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingchange = (e) => {
    const nextRating = Number(e.target.value) || 0;
    setRating(nextRating);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  return(
    <form>
      <input value={title} onChange={handleTitleChange} />
      <input type="number" name="calorie" value={rating} onChange={handleRatingchange} />
      <textarea name="content" value={content} onChange={handleContentChange}></textarea>
    </form>
  )
};

export default ReviewForm;