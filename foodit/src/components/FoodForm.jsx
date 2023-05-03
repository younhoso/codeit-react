import React from "react";
import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState('');
  const [calorie, setCalorie] = useState(0);
  const [content, setcontent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleCaloriechange = (e) => {
    const nextCalorie = Number(e.target.value) || 0;
    setCalorie(nextCalorie);
  }

  const handleContentChange = (e) => {
    setcontent(e.target.value);
  }

  return (
    <form>
      <input name="title" value={title} onChange={handleTitleChange}/>
      <input type="number" name="calorie" value={calorie} onChange={handleCaloriechange}/>
      <input name="content" value={content} onChange={handleContentChange}/>
    </form>
  )
}

export default FoodForm;