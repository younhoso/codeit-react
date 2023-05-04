import React from "react";

function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile)
  }

  return <input type="file" onChange={handleChange}/>
}

export default FileInput;