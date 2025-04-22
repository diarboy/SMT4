import React, { createContext, useContext } from 'react';

const BottomSheetContext = createContext(null);

export const BottomSheetProvider = ({ children, value }) => (
  <BottomSheetContext.Provider value={value}>
    {children}
  </BottomSheetContext.Provider>
);

export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};
