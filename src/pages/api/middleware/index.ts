import { RouterClient, TIME_CLEAR_CACHE, redisKey } from '@/constants'
import { EUserRoles, IUserDetail } from '@/types'
import { AppConfig, isEmpty } from '@/utils'
import { createClient } from 'redis'
import { Auth } from '../user/auth'

/**
 * @description Get user from redis
 */
const redisUserStore = async (token: string): Promise<IUserDetail | null> => {
  let user: IUserDetail | null
  const client = createClient({
    password: AppConfig.redisPassword,
    socket: {
      host: AppConfig.redisHost,
      port: Number(AppConfig.redisPort),
    },
  })

  await client.connect()

  user = JSON.parse((await client.get(redisKey.user)) as string) as IUserDetail

  if (isEmpty(user)) {
    try {
      user = (await Auth.init(token)).user
      await client.set(redisKey.user, JSON.stringify(user), {
        EX: TIME_CLEAR_CACHE,
      })
    } catch (error) {
      user = null
    }
  }

  await client.disconnect()

  return user
}

export const isAuthenticatedAdmin = async ({ token }: { token: string }) => {
  let isAdmin = false

  try {
    isAdmin = (await Auth.init(token)).user.role === EUserRoles.ADMIN
  } catch (error) {
    isAdmin = false
  }

  return isAdmin
}

export const isAuthenticatedPlayer = async ({ token }: { token: string }) => {
  let isPlayer = false

  try {
    isPlayer = (await Auth.init(token)).user.role === EUserRoles.PLAYER
  } catch (error) {
    isPlayer = false
  }

  return isPlayer
}

export const redirectToHome = {
  redirect: {
    destination: RouterClient.HOME,
    permanent: false,
  },
}
