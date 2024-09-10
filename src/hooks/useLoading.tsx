import { useState } from "react";

const useLoading = (loading?: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(loading ?? false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
