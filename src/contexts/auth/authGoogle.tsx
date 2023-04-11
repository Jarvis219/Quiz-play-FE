import { ENotificationType } from '@/types'
import { AppConfig } from '@/utils'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { useToastContext } from '../ToastContext'

interface IGoogleButtonProps {
  className?: string
  onLoginSuccess: (token: string) => Promise<void>
}

export const GoogleButton = ({ onLoginSuccess, className }: IGoogleButtonProps) => {
  return (
    <GoogleOAuthProvider clientId={AppConfig.googleClientId as string}>
      <LoginButton onLoginSuccess={onLoginSuccess} className={className} />
    </GoogleOAuthProvider>
  )
}

const LoginButton = ({ onLoginSuccess }: IGoogleButtonProps) => {
  const { showToast } = useToastContext()

  const login = useGoogleLogin({
    onSuccess({ access_token }) {
      return onLoginSuccess(access_token)
    },
    onError() {
      showToast({
        type: ENotificationType.ERROR,
        message: 'Login failed',
      })
    },
  }) as () => void

  return (
    <button
      onClick={login}
      className='text-xs left-5 border border-gray-800 rounded-3xl flex justify-center items-center gap-1 w-full py-1.5'>
      Sign In with Google
    </button>
  )
}
