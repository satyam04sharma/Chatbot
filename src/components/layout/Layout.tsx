import Head from 'next/head'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Satyam's AI-Powered Portfolio</title>
        <meta name="description" content="An AI-powered interactive portfolio for Satyam Sharma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  )
}