import { Auth } from '@/pages/api/auth'
import { IUser } from '@/types/user'
import { getJwtToken, setJwtToken } from '@/utils'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'
import { useLoadingContext } from '../loading/LoadingContext'

interface IAuthContext {
  user?: IUser
  isLoggedIn: boolean
  login: (user: IUser) => void
  logout: () => void
}

const initState: IAuthContext = {
  user: undefined,
  isLoggedIn: false,
  login: () => void 0,
  logout: () => void 0,
}

const AuthContext = createContext<IAuthContext>(initState)

interface IAuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
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

  const login = (user: IUser) => {
    setUser(user)
    setJwtToken(user.accessToken)
  }

  const logout = () => {
    setUser(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export function useAuthContext(): IAuthContext {
  return useContext(AuthContext)
}
