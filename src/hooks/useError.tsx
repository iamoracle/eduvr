import { useState } from "react";

const useError = () => {
  const [error, setError] = useState<boolean>(false);

  const hasError = () => {
    setError(true);
  };

  const clearError = () => {
    setError(false);
  };

  return { error, hasError, clearError };
};

export default useError;
