import React, { useState, useEffect } from "react";
import FoodList from "./components/FoodList";
import FoodForm from "./components/FoodForm";
import { createFood, delecteFood, getFoods, updateFood } from "./api";
import { LocaleProvider } from "./contexts/LocaleContext";
import LocaleSelect from "./components/LocaleSelect";

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

  const handleDelete = async (id) => {
    const result = await delecteFood(id);
    if(!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (orderQuery) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(orderQuery);
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

  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems])
  }

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({order, search});
  }, [order, search]);

  return (
    <LocaleProvider defaultValue={'ko'}>
    <div>
    <LocaleSelect />
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess}/>
      <FoodList items={sortedItems} onUpdate={updateFood} onUpdateSuccess={handleUpdateSuccess} onDelete={handleDelete} />
      {cursor && <button disabled={isLoading} onClick={handleLoadMore}>더보기</button>}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
    </LocaleProvider>
  );
}

export default App;
