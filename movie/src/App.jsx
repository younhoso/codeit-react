import React, { useState, useEffect } from "react";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import { createReview, delecteReview, getReviews, updateReview } from "./api";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await delecteReview(id);
    if(!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch(error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const {paging, reviews} = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = (e) => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems])
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.splice(splitIdx + 1)
      ]
    })
  }

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div className="App">
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm onSubmit={createReview} onSubmitSuccess={handleCreateSuccess}/>
      <ReviewList items={sortedItems} onDelete={handleDelete} onUpdate={updateReview} onUpdateSuccess={handleUpdateSuccess} />
      {hasNext && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
export default App;
