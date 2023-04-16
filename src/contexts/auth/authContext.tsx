import { Auth } from '@/pages/api/user/auth'
import { IUser, IUserDetail } from '@/types/user'
import { getJwtToken, removeJwtToken, setJwtToken } from '@/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { useLoadingContext } from '../loading/LoadingContext'

const SignUpModal = dynamic(() => import('@/components/auth/SignUpModal'), { ssr: false })
const SignInModal = dynamic(() => import('@/components/auth/SignInModal'), { ssr: false })
const ForgotPasswordModal = dynamic(() => import('@/components/auth/ForgotPasswordModal'), { ssr: false })

interface IAuthContext {
  user?: IUser
  isLoggedIn: boolean
  updateUser: (data: IUserDetail) => void
  login: (user: IUser) => void
  logout: () => void
}

const initState: IAuthContext = {
  user: undefined,
  isLoggedIn: false,
  updateUser: () => void 0,
  login: () => void 0,
  logout: () => void 0,
}

const AuthContext = createContext<IAuthContext>(initState)

interface IAuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { query, push } = useRouter()
  const { setIsLoading } = useLoadingContext()
  const [user, setUser] = useState<IUser | undefined>(undefined)

  useEffectOnce(() => {
    const token = getJwtToken()
    if (!token) return

    initUser()
  })

  const initUser = async () => {
    setIsLoading(true)
    const user = await Auth.init().finally(() => setIsLoading(false))
    setUser(user)
    setJwtToken(user.accessToken)
  }

  const updateUser = (data: IUserDetail) =>
    setUser(
      (pre) =>
        ({
          ...pre,
          user: {
            ...pre?.user,
            ...data,
          },
        } as IUser)
    )

  const login = (user: IUser) => {
    setUser(user)
    setJwtToken(user.accessToken)

    query.callback && push(query.callback as string)
  }

  const logout = () => {
    setUser(undefined)
    removeJwtToken()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        updateUser,
        login,
        logout,
      }}>
      {children}
      <SignInModal />
      <SignUpModal />
      <ForgotPasswordModal />
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext)
}
