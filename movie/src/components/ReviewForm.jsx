import React, { useState } from "react";

function ReviewForm() {
  const [values, setValues] = useState({
    title: '',
    rating: 0,
    content: ''
  })

  const handleChange = (e) => {
   const { name, value } = e.target;
   setValues((prevValues) => ({
    ...prevValues,
    [name]: value
   }))
  }
  // const [title, setTitle] = useState('');
  // const [rating, setRating] = useState(0);
  // const [content, setContent] = useState('');

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleRatingchange = (e) => {
  //   const nextRating = Number(e.target.value) || 0;
  //   setRating(nextRating);
  // };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  };

  return(
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input type="number" name="rating" value={values.rating} onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleChange}></textarea>
      <button type="submit">확인</button>
    </form>
  )
};

export default ReviewForm;