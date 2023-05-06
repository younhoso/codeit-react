import React from "react";
import { useState } from "react";
import FileInput from "./FileInput";
import { createFood } from "../api";

const INITIAL_VALUES = {
  title: '',
  calorie: 0,
  content: '',
  imgFile: null
};

function FoodForm({onSubmitSuccess}) {
  const [values, setValues] = useState(INITIAL_VALUES)

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('imgFile', values.imgFile);
    formData.append('calorie', values.calorie);
    formData.append('content', values.content);
    const { food } = await createFood(formData);
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES)
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