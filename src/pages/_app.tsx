import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Satyam's AI-Powered Portfolio</title>
        <meta name="description" content="An AI-powered interactive portfolio for Satyam Sharma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default MyApp