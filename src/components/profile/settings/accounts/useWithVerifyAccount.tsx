import { useAuthContext } from '@/contexts/auth/authContext'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Comingsoon = dynamic(() => import('@/components/base/ComingSoon'), { ssr: false })

interface IProps {
  children: ReactNode
}

const useWithVerifyAccount = ({ children }: IProps) => {
  const { user } = useAuthContext()
  return user?.user.is_verified ? (
    children
  ) : (
    <Comingsoon
      title='
  Verify your account to use this feature
  '>
      {children}
    </Comingsoon>
  )
}

export default useWithVerifyAccount
