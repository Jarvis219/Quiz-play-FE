import { publicRequest, request } from '@/services'
import { ILoginWithUsername, IReisterViaUsername } from '@/types/auth'
import { IUser } from '@/types/user'
import { getJwtToken } from '@/utils'

export class Auth {
  static async init(): Promise<IUser> {
    const { data } = await request.get('/auth/init/me', {
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
      },
    })
    return data
  }

  static async loginWithUsername({ username, password }: ILoginWithUsername): Promise<IUser> {
    const { data } = await publicRequest.post('/auth/login/username', {
      username,
      password,
    })
    return data
  }

  static async loginWithGoogle({ token }: { token: string }): Promise<IUser> {
    const { data } = await publicRequest.post('/auth/login/google', {
      token,
    })
    return data
  }

  static async registerViaUsername({
    full_name,
    email,
    username,
    password,
    phone_number,
    address,
    avatar,
  }: IReisterViaUsername): Promise<IUser> {
    const { data } = await publicRequest.post('/auth/register/username', {
      full_name,
      email,
      username,
      password,
      phone_number,
      address,
      avatar,
    })
    return data
  }
}
