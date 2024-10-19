import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';

/**
 * The root component of the app.
 *
 * This component is responsible for rendering the entire app. It wraps
 * the given `Component` with a `Head` component and a `ToastContainer`.
 *
 * @param {AppProps} props The props for this component.
 * @returns {JSX.Element} The rendered JSX element.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Recruiter`&apos;s Assistant</title>
        <meta name="description" content="An AI-powered interactive portfolio for Satyam Sharma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

export default MyApp