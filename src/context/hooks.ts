import { useContext } from 'react';
import AppContext from './AppContext';

export const useAppStore = () => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
