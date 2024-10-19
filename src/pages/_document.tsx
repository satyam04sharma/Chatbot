import { Html, Head, Main, NextScript } from 'next/document'
import { DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {
  return (
    <Html lang="en">
       <Head>
          {/* SEO Metadata */}
          <meta name="description" content="Recruiter's Assistant is a chatbot that helps streamline the recruitment process." />
          <meta name="keywords" content="chatbot, recruitment, assistant, AI, OpenAI" />
          <meta name="author" content="Your Name" />
          <meta property="og:title" content="Recruiter's Assistant" />
          <meta property="og:description" content="Chatbot for recruitment assistance." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://chat.satyamsharma.com" />
          <meta property="og:image" content="URL_to_your_image" />

          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-4V6K51HBEZ"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4V6K51HBEZ');
              `,
            }}
          />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}