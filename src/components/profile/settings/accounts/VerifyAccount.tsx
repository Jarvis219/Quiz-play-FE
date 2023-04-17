import QButton from '@/components/base/QButton'
import { useLoadingContext } from '@/contexts/LoadingContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { Auth } from '@/pages/api/user/auth'
import { EButtonType, ENotificationType } from '@/types'
import { CheckCircleOutlined } from '@ant-design/icons'
import { memo } from 'react'

const VerifyAccount = () => {
  const { user } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  const is_verified = user?.user.is_verified

  const handleVerify = async () => {
    setIsLoading(true)
    await Auth.sendEmailVerification().finally(() => setIsLoading(false))
    showToast({
      type: ENotificationType.SUCCESS,
      message: 'Please check your email to verify your account',
    })
  }

  return (
    <section className='flex justify-between items-center group'>
      <div className={`flex justify-start items-center gap-x-2 ${!is_verified && 'group-hover:text-yellow-500'}`}>
        <CheckCircleOutlined
          className={`text-gray-400 text-xs flex flex-col justify-center items-center ${
            is_verified ? 'text-green-500' : 'group-hover:text-yellow-500'
          }`}
        />
        <p className='text-sm font-semibold leading-4'>{is_verified ? 'Verified' : 'Verify your account'}</p>
      </div>
      {!is_verified && (
        <QButton onClick={handleVerify} type={EButtonType.primary} className='shadow-primary'>
          <p className='text-sm font-semibold leading-4'>Verify</p>
        </QButton>
      )}
    </section>
  )
}

export default memo(VerifyAccount)
