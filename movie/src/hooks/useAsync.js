import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFuncion = async (...args) => {
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
    } catch(error){
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  }

  return [pending, error, wrappedFuncion];
}

export default useAsync;