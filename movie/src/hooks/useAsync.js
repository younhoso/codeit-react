import { useState, useCallback } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFuncion = useCallback(async (...args) => {
    setPending(true);
    setError(null);
    try {
      return await asyncFunction(...args);
    } catch(error){
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  }, [asyncFunction])

  return [pending, error, wrappedFuncion];
}

export default useAsync;