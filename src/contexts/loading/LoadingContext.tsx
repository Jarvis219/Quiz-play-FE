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
          <section className={`${styles['container']}`}>
            <div className={`${styles['scene']}`}>
              <div className={`${styles['shadow']}`} />
              <div className={`${styles['jumper']}`}>
                <div className={`${styles['spinner']}`}>
                  <div className={`${styles['scaler']}`}>
                    <div className={`${styles['loader']}`}>
                      <div className={`${styles['cuboid']}`}>
                        <div className={`${styles['cuboid__side']}`} />
                        <div className={`${styles['cuboid__side']}`} />
                        <div className={`${styles['cuboid__side']}`} />
                        <div className={`${styles['cuboid__side']}`} />
                        <div className={`${styles['cuboid__side']}`} />
                        <div className={`${styles['cuboid__side']}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
