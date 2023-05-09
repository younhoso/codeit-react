import React, { useState } from "react";
import { formatDate } from "../utils";
import { useLocale } from "../contexts/LocaleContext";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import "../styles/index.scss";

const ReviewListItem = ({ item, onDelete, onEdit }) => {
  const { id, imgUrl, title, rating, createdAt, content } = item;

  const locale = useLocale();

  const handleDeleteClick = () => onDelete(id);

  const handleEditClick = () => onEdit(id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
        <p>현재 언어: {locale}</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
};

const ReviewList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
  const [ editingId, setEditingId ] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="ReviewList">
      {items.map((item) => {
        if(item.id === editingId){
          const { id, imgUrl, title, rating, content} = item;
          const initialValues = {title, rating, content};
          
          const handleSubmit = (formatDate) => onUpdate(id, formatDate);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return(
            <li key={item.id}>
              <ReviewForm 
                initialValues={initialValues} 
                initialPreview={imgUrl} 
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          )
        }
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} onEdit={setEditingId}/>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
