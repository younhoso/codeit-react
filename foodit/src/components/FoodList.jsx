import React, { useState } from "react";
import { formatDate } from "../utils";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";
import "../styles/FoodList.css";

function FoodListItem({ item, onDelete, onEdit }) {
  const { id, imgUrl, title, calorie, content, createdAt } = item;
  const t = useTranslate();

  const handleDeleteClicl = () => onDelete(id);

  const handleEditClick = () => onEdit(id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>{t('edit button')}</button>
      <button onClick={handleDeleteClicl}>{t('delete button')}</button>
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
