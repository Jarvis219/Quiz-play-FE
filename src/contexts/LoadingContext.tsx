import Loading from '@/components/base/loading/Loading'
import Router from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

interface ILoadingContext {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setIsLoading: () => void 0,
})

const LoadingProvider = ({ children }: { children: JSX.Element }) => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true))
    Router.events.on('routeChangeComplete', () => setIsLoading(false))
    Router.events.on('routeChangeError', () => setIsLoading(false))
    return () => {
      Router.events.off('routeChangeStart', () => setIsLoading(true))
      Router.events.off('routeChangeComplete', () => setIsLoading(false))
      Router.events.off('routeChangeError', () => setIsLoading(false))
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider

export function useLoadingContext(): ILoadingContext {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoadingContext must be used within a LoadingProvider')
  }
  return context
}
