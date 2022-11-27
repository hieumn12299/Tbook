import React, { FC, useState } from 'react';
import AppContext from './AppContext';
import { useReducer } from 'react';
import reducer, { initialData } from './reducer';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
