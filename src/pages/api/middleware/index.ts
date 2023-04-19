import { RouterClient, TIME_CLEAR_CACHE, redisKey } from '@/constants'
import { EUserRoles, IUserDetail } from '@/types'
import { AppConfig, isEmpty } from '@/utils'
import { createClient } from 'redis'
import { Auth } from '../user/auth'

const redisUserStore = async (token: string): Promise<IUserDetail> => {
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
    user = (await Auth.init(token)).user
    await client.set(redisKey.user, JSON.stringify(user), {
      EX: TIME_CLEAR_CACHE,
    })
  }

  await client.disconnect()

  return user
}

export const isAuthenticatedAdmin = async ({ token }: { token: string }) => {
  const user = await redisUserStore(token)
  return user.role === EUserRoles.ADMIN
}

export const isAuthenticatedPlayer = async ({ token }: { token: string }) => {
  const user = await redisUserStore(token)
  return user.role === EUserRoles.PLAYER
}

export const redirectToHome = {
  redirect: {
    destination: RouterClient.HOME,
    permanent: false,
  },
}
