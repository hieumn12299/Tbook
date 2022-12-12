import { onAuthStateChanged } from 'firebase/auth';
import Router from 'next/router';
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { auth } from '../../config/firebaseConfig';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const [fetching, setFetching] = useState(true);
  const unRegisterAuthObserver = onAuthStateChanged(auth, (user) => {
    if (user) {
      Router.push('/');
    } else {
      setFetching(false);
    }
  });

  useEffect(() => {
    return () => unRegisterAuthObserver();
  }, []);

  if (fetching) return <></>;

  return <div>{children}</div>;
};

export default CommonLayout;
