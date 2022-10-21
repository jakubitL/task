import "../styles/globals.css";
import type { AppProps } from "next/app";
import Breadcrumbs from "../components/Breadcrumbs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { store } from '../store/index';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
const router = useRouter()
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>
          Zadanie testowe 
          {/**
           * TODO: Dodaj tytuł aktualnej strony
           */}
        </title>
      </Head>
      <Breadcrumbs />
      <Component {...pageProps} />

      {/**
       * TODO: powrót do poprzedniej strony jeśli nie jesteśmy aktualnie na stronie głównej
       */}
      <Link href="/">Powrót</Link>
      </Provider>
    </>
  );
}

export default MyApp;
