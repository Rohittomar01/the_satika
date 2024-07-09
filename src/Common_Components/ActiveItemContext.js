// contexts/ActiveItemContext.js
import React, { createContext, useContext, useState } from 'react';

const ActiveItemContext = createContext();

export const ActiveItemProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState("product");

  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};

export const useActiveItem = () => useContext(ActiveItemContext);
