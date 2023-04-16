import { memo } from 'react'
import styles from './LoadingContext.module.css'

const Loading = () => {
  return (
    <>
      <div className={`${styles['overlay']}`} />
      <div className={`${styles['loader']}`}>
        <div className={`${styles['one']} ${styles['inner']}`} />
        <div className={`${styles['two']} ${styles['inner']}`} />
        <div className={`${styles['three']} ${styles['inner']}`} />
      </div>
    </>
  )
}

export default memo(Loading)
