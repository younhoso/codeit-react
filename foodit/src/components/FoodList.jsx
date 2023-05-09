import React, { useContext, useState } from "react";
import { formatDate } from "../utils";
import FoodForm from "./FoodForm";
import "../styles/FoodList.css";
import LocaleContext from "../contexts/LocaleContext";

function FoodListItem({ item, onDelete, onEdit }) {
  const { id, imgUrl, title, calorie, content, createdAt } = item;

  const locale = useContext(LocaleContext);

  const handleDeleteClicl = () => onDelete(id);

  const handleEditClick = () => onEdit(id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <p>현재 언어: {locale}</p>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDeleteClicl}>삭제</button>
    </div>
  );
}

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [ editingId, setEditingId ] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if(item?.id === editingId){
          const { id, imgUrl, title, calorie, content} = item;
          const initialValues = {title, calorie, content};
          const handleSubmit = (formatDate) => onUpdate(id, formatDate);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return(
            <li key={item.id}>
              <FoodForm 
                initialValues={initialValues} 
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          )
        }

        return(
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} onEdit={setEditingId}/>
          </li>
        )
      })}
    </ul>
  );
}

export default FoodList;
