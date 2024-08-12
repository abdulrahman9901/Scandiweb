import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [needsRefetch, setNeedsRefetch] = useState(false);

  return (
    <DataContext.Provider value={{ needsRefetch , setNeedsRefetch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
