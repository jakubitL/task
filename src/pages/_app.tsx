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
        <div className="heading"><span>Gwiezdne Wojny</span></div>
        <Breadcrumbs />
        <div className="content">
          <Component {...pageProps} />
          {router.pathname !== '/' && <button className="return" onClick={() => onReturnClick()}>Powrót</button>}
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
