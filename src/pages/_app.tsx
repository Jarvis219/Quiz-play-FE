import ToastProvider from '@/contexts/ToastContext'
import AuthProvider from '@/contexts/auth/authContext'
import LoadingProvider from '@/contexts/loading/LoadingContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <ToastProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ToastProvider>
    </LoadingProvider>
  )
}
