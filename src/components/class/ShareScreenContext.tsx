import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Define the types for the context values
type ShareScreenContextType = {
  shareScreenFunction: (() => void) | null;
  setShareScreen: (func: () => void) => void;
};

// Create context with default values
const ShareScreenContext = createContext<ShareScreenContextType | undefined>(undefined);

// Custom hook to use the ShareScreenContext
export const useShareScreen = () => {
  const context = useContext(ShareScreenContext);
  if (!context) {
    throw new Error("useShareScreen must be used within a ShareScreenProvider");
  }
  return context;
};

// ShareScreenProvider component with children props
export const ShareScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shareScreenFunction, setShareScreenFunction] = useState<(() => void) | null>(null);

  const setShareScreen = useCallback((func: () => void) => {
    setShareScreenFunction(() => func);
  }, []);

  return (
    <ShareScreenContext.Provider value={{ shareScreenFunction, setShareScreen }}>
      {children}
    </ShareScreenContext.Provider>
  );
};
