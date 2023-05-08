import React, {useRef, useState, useEffect} from "react";

function FileInput({ name, value, onChange, initialPreview }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile)
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if(!inputNode) return;
    inputNode.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if(!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    }
  },[value, initialPreview]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef}/>
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  )
}

export default FileInput;