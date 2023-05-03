import React, { useState, useEffect } from "react";
import FoodList from "./components/FoodList";
import { getReviews } from "./api";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState('');
  
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (orderQuery) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(orderQuery);
    } catch(error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { foods, paging: {nextCursor} } = result;
    if(!orderQuery.cursor){
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({order, cursor, search});
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value);
  }

  useEffect(() => {
    handleLoad({order, search});
  }, [order, search]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
