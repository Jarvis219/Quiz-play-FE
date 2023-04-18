import { publicRequest, request } from '@/services'
import { ILoginWithUsername, IReisterViaUsername } from '@/types/auth'
import { IUser } from '@/types/user'
import { getJwtToken } from '@/utils'

export class Auth {
  static async init(token?: string): Promise<IUser> {
    const { data } = await request.get('/auth/init/me', {
      headers: {
        Authorization: `Bearer ${token ?? getJwtToken()}`,
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
    first_name,
    last_name,
    email,
    username,
    password,
    phone_number,
    address,
    avatar,
  }: IReisterViaUsername): Promise<IUser> {
    const { data } = await publicRequest.post('/auth/register/username', {
      first_name,
      last_name,
      email,
      username,
      password,
      phone_number,
      address,
      avatar,
    })
    return data
  }

  static async sendEmailVerification(): Promise<boolean> {
    const data = await publicRequest.post('/auth/send-email-verify')
    return !!data
  }

  static async verifyEmail({ token }: { token: string }): Promise<IUser> {
    const { data } = await publicRequest.post('/auth/verify-email', {
      token,
    })
    return data
  }

  static async resetPassword({ token, password }: { token: string; password: string }): Promise<boolean> {
    const data = await publicRequest.post('/auth/reset-password', {
      token,
      password,
    })
    return !!data
  }

  static async forgotPassword({ email }: { email: string }): Promise<boolean> {
    const data = await publicRequest.post('/auth/forgot-password', {
      email,
    })
    return !!data
  }
}
