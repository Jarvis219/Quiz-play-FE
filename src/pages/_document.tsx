import { AppConfig } from '@/utils'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={AppConfig.locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
