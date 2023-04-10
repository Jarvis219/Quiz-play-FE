import { publicRequest, request } from '@/services'
import { TRequest } from '@/types'
import { ILoginWithUsername, IReisterViaUsername } from '@/types/auth'

export class Auth {
  static async init(req: TRequest) {
    const { data } = await request.get('/auth/init/me', {
      headers: {
        Authorization: `Bearer ${req.cookies['jwtToken']}`,
      },
    })
    return data
  }

  static async loginWithUsername({ username, password }: ILoginWithUsername) {
    const { data } = await publicRequest.post('/auth/login/username', {
      username,
      password,
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
  }: IReisterViaUsername) {
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
