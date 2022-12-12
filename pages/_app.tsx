import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../config/firebaseConfig';
import { AppProvider } from '../src/context/AppProvider';
import { IcurrentUser } from '../src/types/auth';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import '../styles/globals.scss';
import MyLoader from '../components/Loading';
import { NextPage } from 'next';
import PrivateLayout from '../components/Layout/PrivateLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return Component.getLayout ? (
    getLayout(<Component {...pageProps} />)
  ) : (
    <PrivateLayout>
      <Component {...pageProps} />
    </PrivateLayout>
  );
}
