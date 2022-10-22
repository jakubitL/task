import "../styles/globals.css";
import type { AppProps } from "next/app";
import Breadcrumbs from "../components/Breadcrumbs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { store } from '../store/index';
import { Provider } from 'react-redux';
import {titleNames} from '../store/index'
function MyApp({ Component, pageProps }: AppProps) {
const router = useRouter()
const getTitleName = () => {
  return titleNames.find(item => item.path === router.pathname)?.title
}
const onReturnClick = () => {
  if (router.pathname !== '/')
  router.back()
}
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>
          Zadanie testowe | {getTitleName()}
        </title>
      </Head>
      <Breadcrumbs />
      <Component {...pageProps} />

      {/**
       * TODO: powrót do poprzedniej strony jeśli nie jesteśmy aktualnie na stronie głównej
       */}
      <span onClick={() => onReturnClick()}>Powrót</span>
      </Provider>
    </>
  );
}

export default MyApp;
