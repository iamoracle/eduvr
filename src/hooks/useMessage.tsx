import { useState } from "react";

const useMessage = () => {
  const [message, setMessage] = useState<string>("");

  const clearMessage = () => {
    setMessage("");
  };

  return { message, clearMessage, setMessage };
};

export default useMessage;
