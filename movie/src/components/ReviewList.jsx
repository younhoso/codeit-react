import React from "react";
import { formatDate } from "../utils";
import Rating from "./Rating";
import "../styles/index.scss";

const ReviewListItem = ({ item, onDelete }) => {
  const { id, imgUrl, title, rating, createdAt, content } = item;

  const handleDeleteClick = () => onDelete(id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={imgUrl} alt={title} />
      <div>
        <h1>{title}</h1>
        <Rating value={rating} />
        <p>{formatDate(createdAt)}</p>
        <p>{content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
};

const ReviewList = ({ items, onDelete }) => {
  return (
    <ul className="ReviewList">
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
