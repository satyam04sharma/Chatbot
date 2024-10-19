import EnhancedFuturisticPortfolio from '../components/EnhancedFuturisticPortfolio'
import Layout from '../components/layout/Layout'

/**
 * The main entry point for the app.
 *
 * @returns The JSX for the home page, which consists of the main layout and the enhanced futuristic portfolio.
 */
export default function Home() {
  return (
    <Layout>
      <EnhancedFuturisticPortfolio />
    </Layout>
  )
}