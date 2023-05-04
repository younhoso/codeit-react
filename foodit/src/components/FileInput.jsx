import React, {useRef} from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    onChange(name, nextFile)
  }

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if(!inputNode) return;
    inputNode.value = '';
    onChange(name, null);
  }

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef}/>
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  )
}

export default FileInput;