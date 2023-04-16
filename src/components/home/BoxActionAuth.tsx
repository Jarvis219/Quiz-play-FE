import { EMIITER_CODE, videoUrl } from '@/constants'
import { EButtonType } from '@/types'
import { Emitter } from '@/utils'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const QButton = dynamic(() => import('../base/QButton'), { ssr: false })

const BoxActionAuth = () => {
  const handleOpenSignInModal = () => Emitter.emit(EMIITER_CODE.SIGN_IN_MODAL)
  const handleOpenSignUpModal = () => Emitter.emit(EMIITER_CODE.SIGN_UP_MODAL)

  return (
    <section>
      <div className='w-fit mx-auto p-1.5 bg-gray-100 rounded-full flex items-center justify-center gap-x-1 text-gray-800 font-semibold'>
        <video width='32' height='32' src={videoUrl.avatar} className='rounded-full' autoPlay={true} loop={true} />
        <span className='mr-6'>Create an account</span>
      </div>
      <div className='flex justify-center items-center gap-x-1 mt-1'>
        <QButton type={EButtonType.text} className='!text-sm' onClick={handleOpenSignInModal}>
          <span className='text-violet-500 font-semibold'>Sign In</span>
        </QButton>
        <span className='w-1.5 h-1.5 rounded-full bg-violet-600'></span>
        <QButton type={EButtonType.text} className='!text-sm' onClick={handleOpenSignUpModal}>
          <span className='text-violet-500 font-semibold'>Sign Up</span>
        </QButton>
      </div>
    </section>
  )
}

export default memo(BoxActionAuth)
