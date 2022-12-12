import { onAuthStateChanged } from 'firebase/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import { auth } from '../../config/firebaseConfig';
import { AppProvider } from '../../src/context/AppProvider';
import { IcurrentUser } from '../../src/types/auth';
import Header from '../Header';
import MyLoader from '../Loading';

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IcurrentUser | null>(null);

  const [fetching, setFetching] = useState(true);

  const unRegisterAuthObserver = onAuthStateChanged(auth, (user) => {
    setFetching(false);
    if (user) {
      const uid = user.uid;
      setCurrentUser({
        id: uid,
        name: user.displayName || '',
        img: user.photoURL,
      });
    } else {
      setCurrentUser(null);
    }
  });

  useEffect(() => {
    return () => unRegisterAuthObserver();
  }, []);

  return (
    <MyLoader active={fetching}>
      <AppProvider>
        <Header currentUser={currentUser} />
        {children}
      </AppProvider>
    </MyLoader>
  );
};

export default PrivateLayout;
