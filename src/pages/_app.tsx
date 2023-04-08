import ToastProvider from '@/contexts/ToastContext'
import LoadingProvider from '@/contexts/loading/LoadingContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </LoadingProvider>
  )
}
