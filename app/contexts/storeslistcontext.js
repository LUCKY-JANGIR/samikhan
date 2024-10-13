// src/contexts/StoresContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const StoresContext = createContext();

export const useStores = () => {
  return useContext(StoresContext);
};

export const StoresProvider = ({ children }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch('/api/stores'); // Adjust this URL as necessary
      const data = await response.json();
      setStores(data);
    };

    fetchStores();
  }, []);

  return (
    <StoresContext.Provider value={stores}>
      {children}
    </StoresContext.Provider>
  );
};
