import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Breadcrumbs from "../components/Breadcrumbs";
import Head from "next/head";
import { useRouter } from 'next/router'
import { store } from '../store/index';
import { Provider } from 'react-redux';
import { breadcrumbsNames } from '../store/index'

function MyApp({ Component, pageProps }: AppProps) {
const router = useRouter()
const getTitleName = () => {
  return breadcrumbsNames.find(item => item.route === router.pathname)?.title
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
      <div className="heading"><span>Gwiezdne wojny - zadanie testowe</span></div>
      <Breadcrumbs />
      <Component {...pageProps} />
      <button onClick={() => onReturnClick()}>Powrót</button>
      </Provider>
    </>
  );
}

export default MyApp;
