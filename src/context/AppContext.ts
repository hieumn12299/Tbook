import React from 'react';
import { StoryDetail, StoryPost } from '../types/story';
import { IInitialData, initialData } from './reducer';

export type ContextState = {
  state: IInitialData;
  dispatch: (action: any) => void;
};

const AppContext = React.createContext<ContextState>({
  state: initialData,
  dispatch(_) {
    console.warn('Context.Provider');
  },
});

export default AppContext;
