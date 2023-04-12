import { createContext, useContext, useState } from 'react'
import styles from './LoadingContext.module.css'

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

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <>
          <div className={`${styles['overlay']}`} />
          <div className={`${styles['loader']}`}>
            <div className={`${styles['one']} ${styles['inner']}`} />
            <div className={`${styles['two']} ${styles['inner']}`} />
            <div className={`${styles['three']} ${styles['inner']}`} />
          </div>
        </>
      )}
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
