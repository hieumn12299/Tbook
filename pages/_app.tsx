import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// import Router from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../config/firebaseConfig';
import { AppProvider } from '../src/context/AppProvider';
import { IcurrentUser } from '../src/types/auth';
import { Analytics } from '@vercel/analytics/react';

import * as ga from '../lib/googleAnalytics';

import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<IcurrentUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
  useEffect(() => {
    return () => unRegisterAuthObserver();
  }, []);

  return (
    <AppProvider>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
      <Analytics />
    </AppProvider>
  );
}
