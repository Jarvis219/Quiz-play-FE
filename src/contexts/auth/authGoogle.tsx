import QButton from '@/components/base/QButton'
import GoogleIcon from '@/components/base/icons/GoogleIcon'
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
    <QButton
      onClick={login}
      icon={<GoogleIcon />}
      className='!text-lg rounded-3xl w-full py-2 flex justify-center items-center shadow-default'>
      Sign In with Google
    </QButton>
  )
}
