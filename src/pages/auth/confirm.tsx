import { RouterClient } from '@/constants'
import { useToastContext } from '@/contexts/ToastContext'
import { useAuthContext } from '@/contexts/auth/authContext'
import { useLoadingContext } from '@/contexts/loading/LoadingContext'
import { ENotificationType } from '@/types'
import { IUserDetail } from '@/types/user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Auth } from '../api/user/auth'

const confirm = () => {
  const { query, push } = useRouter()
  const { updateUser } = useAuthContext()
  const { setIsLoading } = useLoadingContext()
  const { showToast } = useToastContext()

  useEffect(() => {
    if (!query.token) return
    setIsLoading(true)
    Auth.verifyEmail({ token: query.token as string })
      .then(() => {
        showToast({
          type: ENotificationType.SUCCESS,
          message: 'Email verified successfully',
        })

        updateUser({ is_verified: true } as IUserDetail)
      })
      .finally(() => {
        push(RouterClient.HOME)
        setIsLoading(false)
      })
  }, [query])

  return null
}

export default confirm
