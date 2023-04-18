import { fetcher, publicRequest } from '@/services'
import { IAvatarResponse, ICreateAvatar } from '@/types'
import { transformFormDataRequestBody } from '@/utils'

export class AvatarAPI {
  static async getAllAvatars(): Promise<IAvatarResponse[]> {
    const { data } = await publicRequest.get('/avatar')
    return data
  }

  static async getAvatarById({ id }: { id: string }): Promise<IAvatarResponse> {
    const { data } = await publicRequest.get(`/avatar/${id}`)
    return data
  }

  static async createAvatar(body: ICreateAvatar): Promise<IAvatarResponse> {
    const data = await fetcher('/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })

    return data
  }

  static async updateAvatar(body: ICreateAvatar): Promise<IAvatarResponse> {
    const data = await fetcher('/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })

    return data
  }
}
