import { fetcher } from '@/services'
import { transformFormDataRequestBody } from '@/utils'

export class Upload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async uploadFile(body: any) {
    const data = await fetcher('/upload/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: transformFormDataRequestBody(body),
    })

    return data
  }
}
