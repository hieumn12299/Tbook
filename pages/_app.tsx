import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../config/firebaseConfig';
import { AppProvider } from '../src/context/AppProvider';
import { IcurrentUser } from '../src/types/auth';

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<IcurrentUser | null>(null);
  useEffect(() => {
    const unRegisterAuthObserver = onAuthStateChanged(auth, (user) => {
      // setProcessing(true);
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
    return () => unRegisterAuthObserver();
  });
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  );
}
