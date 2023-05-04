import React from "react";
import { useState } from "react";
import FileInput from "./FileInput";

function FoodForm() {
  const [values, setValues] = useState({
    title: '',
    calorie: 0,
    content: '',
    imgFile: null
  })

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
      <input name="title" value={values.title} onChange={handleInputChange}/>
      <input name="calorie" value={values.calorie} onChange={handleInputChange} type="number"/>
      <input name="content" value={values.content} onChange={handleInputChange}/>
      <button type="submit">확인</button>
    </form>
  )
}

export default FoodForm;