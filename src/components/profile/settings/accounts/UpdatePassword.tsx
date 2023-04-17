import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Auth } from '@/pages/api/user/auth'
import { EButtonType, ENotificationType } from '@/types'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const QButton = dynamic(() => import('@/components/base/QButton'), { ssr: false })

const UpdatePassword = () => {
  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const handleSendEmailForgotPassword = async () => {
    if (!user?.user.email) return
    setIsLoading(true)
    await Auth.forgotPassword({ email: user.user.email }).finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Please check your email to reset your password',
    })
  }

  return (
    <section className='flex justify-between items-center group'>
      <div className='group-hover:text-yellow-500'>
        <p className='text-sm font-semibold leading-4'>Update password</p>
      </div>
      <QButton type={EButtonType.primary} className='shadow-primary' onClick={handleSendEmailForgotPassword}>
        <p className='text-sm font-semibold leading-4'>Update</p>
      </QButton>
    </section>
  )
}

export default memo(UpdatePassword)
