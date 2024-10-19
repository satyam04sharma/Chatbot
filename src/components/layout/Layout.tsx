import Head from 'next/head'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
}

/**
 * The main layout component for the app.
 *
 * @param {ReactNode} children - The content of the layout.
 * @param {string} [title] - The title of the page. Defaults to "Recruiter's Assistant".
 * @returns {JSX.Element} The layout component.
 */
export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || "Recruiter's Assistant"}</title>
        <meta name="description" content="An AI-powered interactive portfolio for Satyam Sharma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  )
}