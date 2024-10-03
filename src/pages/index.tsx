import Head from 'next/head'
import EnhancedFuturisticPortfolio from '../components/EnhancedFuturisticPortfolio'

export default function Home() {
  return (
    <>
      <Head>
        <title>Satyam's AI-Powered Portfolio</title>
        <meta name="description" content="An AI-powered interactive portfolio for Satyam Sharma" />
      </Head>
      <EnhancedFuturisticPortfolio />
    </>
  )
}