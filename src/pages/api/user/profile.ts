import { fetcher } from '@/services'
import { IUpdateProfile, IUserDetail } from '@/types/user'
import { transformFormDataRequestBody } from '@/utils'

export class Profile {
  static async updateProfile(body: IUpdateProfile): Promise<IUserDetail> {
    const data = await fetcher('/user/update/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })
    return data
  }
}
