import { EMIITER_CODE } from '@/constants'
import { EButtonType } from '@/types'
import { Emitter } from '@/utils'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const BoxActionAuth = () => {
  const handleOpenSignInModal = () => Emitter.emit(EMIITER_CODE.SIGN_IN_MODAL)
  const handleOpenSignUpModal = () => Emitter.emit(EMIITER_CODE.SIGN_UP_MODAL)
  return (
    <>
      <QButton type={EButtonType.text} className='!text-sm' onClick={handleOpenSignInModal}>
        Sign In
      </QButton>
      <QButton type={EButtonType.primary} className='!text-sm' onClick={handleOpenSignUpModal}>
        Sign Up
      </QButton>
    </>
  )
}

export default memo(BoxActionAuth)
