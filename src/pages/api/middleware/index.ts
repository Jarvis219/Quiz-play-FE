import { RouterClient } from '@/constants'
import { EUserRoles } from '@/types'
import { Auth } from '../user/auth'

export const isAuthenticatedAdmin = async ({ token }: { token: string }) => {
  return (await Auth.init(token)).user.role === EUserRoles.ADMIN
}

export const isAuthenticatedPlayer = async ({ token }: { token: string }) => {
  return (await Auth.init(token)).user.role === EUserRoles.PLAYER
}

export const redirectToHome = {
  redirect: {
    destination: RouterClient.HOME,
    permanent: false,
  },
}
