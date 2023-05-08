import React from "react";
import { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
  title: '',
  calorie: 0,
  content: '',
  imgFile: null
};

function FoodForm({initialValues = INITIAL_VALUES, initialPreview, onSubmit, onSubmitSuccess, onCancel}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues)

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

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch(error){
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} initialPreview={initialPreview}/>
      <input name="title" value={values.title} onChange={handleInputChange}/>
      <input name="calorie" value={values.calorie} onChange={handleInputChange} type="number"/>
      <input name="content" value={values.content} onChange={handleInputChange}/>
      <button type="submit" disabled={isSubmitting}>확인</button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  )
}

export default FoodForm;